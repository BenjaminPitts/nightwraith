import assert from "node:assert/strict"
import { readFile, readdir, stat } from "node:fs/promises"
import path from "node:path"
import test from "node:test"
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
  ]) {
    assert.ok(form.includes(attribute), attribute)
  }
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
