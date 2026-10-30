import assert from "node:assert/strict"
import { readFile, readdir, stat } from "node:fs/promises"
import path from "node:path"
import test from "node:test"
import sharp from "sharp"
import { publicRoutes, siteMetadata } from "../src/site.js"

const output = new URL("../dist/client/", import.meta.url)
const read = file => readFile(new URL(file, output), "utf8")
const pages = [
  ["", "NightWraith"],
  ["bio/", "Bio | NightWraith"],
  ["videos/", "Videos | NightWraith"],
  ["photos/", "Photos | NightWraith"],
  ["press/", "Press | NightWraith"],
  ["contact/", "Contact | NightWraith"],
  ["thanks/", "Contact form confirmation | NightWraith"],
]

test("all seven routes contain initial content and route-specific SEO", async () => {
  for (const [route, title] of pages) {
    const html = await read(`${route}index.html`)
    assert.ok(html.includes(`<title>${title}</title>`), route)
    assert.match(html, /<main(?:\s[^>]*)?>[\s\S]{100,}<\/main>/)
    assert.match(html, /<meta name="description" content="[^"]+"/)
    assert.ok(
      html.includes(`rel="canonical" href="${siteMetadata.siteUrl}/${route}"`)
    )
    for (const name of [
      "og:title",
      "og:description",
      "og:url",
      "twitter:card",
    ]) {
      assert.ok(html.includes(`="${name}"`), `${route}: ${name}`)
    }
  }
  const homepage = await read("index.html")
  const schema = JSON.parse(
    homepage.match(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/
    )[1]
  )
  assert.equal(schema["@type"], "MusicGroup")
  assert.equal(schema.name, "NightWraith")
  assert.equal(schema.url, `${siteMetadata.siteUrl}/`)
  assert.match(await read("thanks/index.html"), /content="noindex, nofollow"/)
})

test("homepage client entry retains the original browser page-load metric", async () => {
  const entries = await readdir(new URL("assets/entries/", output))
  const entry = entries.find(name => /^src_pages_index\..*\.js$/.test(name))
  assert.ok(entry, "Missing homepage client entry")
  const source = await read(`assets/entries/${entry}`)
  assert.ok(source.includes("indexpage.load"))
  assert.ok(source.includes("/api/sendMetric"))
})

test("Bio prerenders the registered promo photo with a 500px display cap", async () => {
  const images = JSON.parse(
    await readFile(new URL("../.generated/images.json", import.meta.url), "utf8")
  )
  const image = images["nw-agr-promo.png"]
  const html = await read("bio/index.html")
  const main = html.match(/<main\b[^>]*>[\s\S]*?<\/main>/)[0]
  assert.ok(main.includes(`src="${image.src}"`))
  assert.ok(main.includes(`width="${image.width}" height="${image.height}"`))
  assert.match(main, /width:calc\(100% - 2rem\)/)
  assert.match(main, /max-width:500px/)
  assert.deepEqual(
    [...main.matchAll(/sizes="([^"]*)"/g)].map(match => match[1]),
    Array(3).fill("(min-width: 576px) 500px, calc(100vw - 76px)")
  )
  assert.match(main, /margin:1rem/)
  assert.match(main, /height:auto/)
  assert.match(main, /alt="Black-and-white NightWraith band portrait in a room covered with signatures"/)
})

test("Shows prerenders only an empty widget host and persistent fallback links", async () => {
  const html = await read("index.html")
  const shows = html.match(/<section[^>]*id="shows"[\s\S]*?<\/section>/)[0]
  assert.match(shows, /class="shows-widget"[^>]*role="region"[^>]*tabindex="0"/)
  assert.match(shows, /<div><\/div>/)
  assert.match(shows, /href="https:\/\/www.bandsintown.com\/a\/15563342-nightwraith"/)
  assert.match(shows, /href="\/contact\/">Booking inquiries<\/a>/)
  assert.doesNotMatch(html, /bit-widget-initializer|bit-widget-container|widgetv3\.bandsintown\.com\/main\.min\.js/)
})

test("Netlify can detect the unchanged contact form before hydration", async () => {
  const html = await read("contact/index.html")
  const form = html.match(/<form\b[\s\S]*?<\/form>/)[0]
  for (const attribute of [
    'name="contact"',
    'method="post"',
    'action="/thanks/"',
    'data-netlify="true"',
    'netlify-honeypot="bot-field"',
    'name="bot-field"',
    'name="form-name" value="contact"',
    'name="name"',
    'name="email"',
    'name="message"',
    'aria-label="Your name"',
    'aria-label="Your email"',
    'aria-label="Message"',
  ]) {
    assert.ok(form.includes(attribute), attribute)
  }
  assert.doesNotMatch(form, /\bnetifly\b/)
})

test("sitemap contains only the six public canonical routes", async () => {
  const sitemap = await read("sitemap/sitemap-0.xml")
  const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
    match => match[1]
  )
  assert.deepEqual(
    locations.sort(),
    publicRoutes.map(route => `${siteMetadata.siteUrl}${route}`).sort()
  )
  assert.ok(
    (await read("robots.txt")).includes(
      `Sitemap: ${siteMetadata.siteUrl}/sitemap/sitemap-index.xml`
    )
  )
  for (const retired of ["using-typescript", "using-dsg"]) {
    await assert.rejects(read(`${retired}/index.html`), { code: "ENOENT" })
  }
  assert.match(await read("404.html"), /404: Not Found/)
})

test("all initial local asset references resolve to published files", async () => {
  for (const [route] of pages) {
    const html = await read(`${route}index.html`)
    const urls = [...html.matchAll(/(?:src|href)="(\/[^"]*)"/g)].map(
      match => match[1]
    )
    for (const [, set] of html.matchAll(/src[Ss]et="([^"]*)"/g)) {
      urls.push(...set.split(",").map(item => item.trim().split(" ")[0]))
    }
    for (const url of urls.filter(url => !url.startsWith("//"))) {
      const file = new URL(`.${url.split("?")[0]}`, output)
      const info = await stat(file)
      if (info.isDirectory()) await stat(new URL("index.html", file))
    }
  }
})

test("published responsive media contains only current manifest variants", async () => {
  const images = JSON.parse(
    await readFile(new URL("../.generated/images.json", import.meta.url), "utf8")
  )
  const expected = new Set(
    Object.values(images).flatMap(image =>
      [image.fallback, image.avif, image.webp].flatMap(set =>
        set.split(",").map(item => path.basename(item.trim().split(" ")[0]))
      )
    )
  )
  assert.deepEqual(new Set(await readdir(new URL("media/", output))), expected)
})

test("registered photo sources exist and gallery sections match image dimensions", async () => {
  const settings = JSON.parse(
    await readFile(new URL("../scripts/image-settings.json", import.meta.url), "utf8")
  )
  for (const name of Object.keys(settings)) {
    await stat(new URL(`../src/images/${name}`, import.meta.url))
  }
  const html = await read("photos/index.html")
  for (const orientation of ["landscape", "portrait"]) {
    const section = html.match(
      new RegExp(`<section[^>]*aria-labelledby="${orientation}s-heading"[\\s\\S]*?<\\/section>`)
    )[0]
    const images = [...section.matchAll(/<img\b[^>]*width="(\d+)" height="(\d+)"/g)]
    assert.ok(images.length > 0, orientation)
    for (const [, width, height] of images) {
      assert.ok(
        orientation === "landscape" ? Number(width) > Number(height) : Number(height) > Number(width),
        `${orientation}: ${width}x${height}`
      )
    }
  }
})

test("gallery additions appear once in landscape order and homepage uses the selected portraits", async () => {
  const images = JSON.parse(
    await readFile(new URL("../.generated/images.json", import.meta.url), "utf8")
  )
  const gallery = await read("photos/index.html")
  assert.doesNotMatch(gallery, /alt="(?:Full Band|Blurry Band|Spy)"/)
  const landscapes = gallery.match(
    /<section[^>]*aria-labelledby="landscapes-heading"[\s\S]*?<\/section>/
  )[0]
  const landscapeSources = [...landscapes.matchAll(/<img\b[^>]*src="([^"]*)"/g)].map(
    match => match[1]
  )
  assert.deepEqual(
    landscapeSources.slice(0, 13),
    [
      "tirenan-test-promo.JPEG", "fists-slo.jpg", "ben-and-jacob.jpg",
      "ben-federal.jpg", "fists-federal.jpg", "ben-and-igor-slo.jpg",
      "promo-2026.jpg", "lauren-federal.jpg", "hidive3.jpg",
      "full-band-oriental2.jpg", "lauren-promo-bw.jpg", "hug.jpg",
      "blurry-band-bw.JPEG",
    ].map(
      name => images[name].src
    )
  )
  const gallerySources = [...gallery.matchAll(/<img\b[^>]*src="([^"]*)"/g)].map(
    match => match[1]
  )
  assert.equal(landscapeSources[14], images["ben-igor-slo.jpg"].src)
  assert.equal(landscapeSources[15], images["promo-2026-fun.jpg"].src)
  assert.equal(landscapeSources[16], images["NW-PROMO-39.jpg"].src)
  assert.equal(landscapeSources[22], images["live2.jpg"].src)
  for (const name of [
    "lauren-promo-bw.jpg", "live2.jpg", "full-band-oriental2.jpg", "NW-PROMO-39.jpg",
    "igor.jpg", "spy2.JPEG", "hidive3.jpg", "ben-igor-slo.jpg",
  ]) {
    assert.equal(gallerySources.filter(src => src === images[name].src).length, 1, name)
  }
  const homepage = await read("index.html")
  const previews = homepage.match(/<section[^>]*id="photos"[\s\S]*?<\/section>/)[0]
  assert.deepEqual(
    [...previews.matchAll(/<img\b[^>]*src="([^"]*)"/g)].map(match => match[1]),
    ["full-band-oriental-color.jpg", "live-oriental.jpg", "hidive.jpg"].map(name => images[name].src)
  )
  assert.equal(images["full-band-oriental-color.jpg"].width, 1200)
  assert.match(images["full-band-oriental-color.jpg"].fallback, /2048w/)
})

test("favicon links use proportion-preserving NightWraith logo icons", async () => {
  for (const size of [16, 32]) {
    for (const [route] of pages) {
      assert.ok(
        (await read(`${route}index.html`)).includes(
          `sizes="${size}x${size}" href="/favicon-${size}x${size}.png?v=nw-logo-2"`
        )
      )
    }
    const file = new URL(`favicon-${size}x${size}.png`, output)
    const icon = sharp(await readFile(file))
    const metadata = await icon.metadata()
    assert.equal(metadata.width, size)
    assert.equal(metadata.height, size)
    const expected = await sharp(
      new URL("../src/images/NW-LOGO-2.png", import.meta.url).pathname
    )
      .rotate()
      .resize(size, size, { fit: "contain", background: "#000000" })
      .flatten({ background: "#000000" })
      .raw()
      .toBuffer()
    assert.deepEqual(await icon.raw().toBuffer(), expected)
  }
})

test("published files exclude server ingestion configuration and Gatsby dependencies", async () => {
  const source = await readFile(
    new URL("../netlify/functions/sendMetric.mjs", import.meta.url),
    "utf8"
  )
  const templates = [...source.matchAll(/`([^`]*\$\{metricName\}[^`]*)`/g)]
  assert.ok(templates.length > 0)
  const prefixes = templates.map(match => match[1].split("${metricName}")[0])
  async function check(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const file = path.join(directory, entry.name)
      if (entry.isDirectory()) await check(file)
      else {
        const content = await readFile(file)
        assert.ok(
          prefixes.every(prefix => !content.includes(prefix)),
          "Server configuration leaked"
        )
      }
    }
  }
  await check(output.pathname)
  const lock = JSON.parse(
    await readFile(new URL("../package-lock.json", import.meta.url), "utf8")
  )
  assert.ok(
    Object.keys(lock.packages).every(
      name => !name.toLowerCase().includes("gatsby")
    )
  )
})
