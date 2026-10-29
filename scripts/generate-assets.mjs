import { createHash } from "node:crypto"
import { mkdir, readFile, readdir, unlink, writeFile, stat } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"
import { publicRoutes, siteMetadata } from "../src/site.js"

const root = fileURLToPath(new URL("../", import.meta.url))
const generated = path.join(root, ".generated")
const output = path.join(generated, "public")
const media = path.join(output, "media")
const settings = JSON.parse(
  await readFile(new URL("./image-settings.json", import.meta.url), "utf8")
)
await mkdir(media, { recursive: true })

async function exists(file) {
  try {
    await stat(file)
    return true
  } catch (error) {
    if (error.code === "ENOENT") return false
    throw error
  }
}

const images = {}
const currentMedia = new Set()
for (const [name, { width, quality }] of Object.entries(settings)) {
  const input = path.join(root, "src/images", name)
  const source = await readFile(input)
  const metadata = await sharp(source).metadata()
  const rotated = metadata.autoOrient ?? metadata
  const displayWidth = Math.min(width, rotated.width)
  const height = Math.round((displayWidth * rotated.height) / rotated.width)
  const widths = [
    ...new Set(
      [0.25, 0.5, 1, 2].map(scale =>
        Math.min(Math.round(width * scale), rotated.width)
      )
    ),
  ].sort((a, b) => a - b)
  const fallbackFormat = metadata.hasAlpha ? "png" : "jpg"
  const hash = createHash("sha256")
    .update(source)
    .update(JSON.stringify({ width, quality, sharp: sharp.versions.sharp }))
    .digest("hex")
    .slice(0, 12)
  const base = `${path.parse(name).name.toLowerCase()}-${hash}`
  const variants = {}
  for (const format of ["avif", "webp", fallbackFormat]) {
    variants[format] = []
    for (const size of widths) {
      const filename = `${base}-${size}.${format}`
      currentMedia.add(filename)
      const file = path.join(media, filename)
      if (!(await exists(file))) {
        await sharp(source)
          .rotate()
          .resize({ width: size, withoutEnlargement: true })
          .toFormat(format === "jpg" ? "jpeg" : format, { quality })
          .toFile(file)
      }
      variants[format].push({ url: `/media/${filename}`, width: size })
    }
  }
  const srcSet = format =>
    variants[format].map(image => `${image.url} ${image.width}w`).join(", ")
  images[name] = {
    width: displayWidth,
    height,
    quality,
    sizes: `(min-width: ${width}px) ${width}px, 100vw`,
    src: variants[fallbackFormat].find(image => image.width === displayWidth)
      .url,
    fallback: srcSet(fallbackFormat),
    avif: srcSet("avif"),
    webp: srcSet("webp"),
  }
}
await writeFile(path.join(generated, "images.json"), JSON.stringify(images))
for (const filename of await readdir(media)) {
  if (
    !currentMedia.has(filename) &&
    /-[a-f0-9]{12}-\d+\.(avif|webp|jpg|png)$/.test(filename)
  ) {
    await unlink(path.join(media, filename))
  }
}

const icons = path.join(output, "icons")
await mkdir(icons, { recursive: true })
const iconSource = path.join(root, "src/images/NW-LOGO-2.png")
const iconSizes = [48, 72, 96, 144, 192, 256, 384, 512]
for (const size of [...iconSizes, 16, 32]) {
  const target =
    size <= 32
      ? path.join(output, `favicon-${size}x${size}.png`)
      : path.join(icons, `icon-${size}x${size}.png`)
  await sharp(iconSource)
    .rotate()
    .resize(size, size, { fit: "contain", background: "#000000" })
    .flatten({ background: "#000000" })
    .png()
    .toFile(target)
}
await writeFile(
  path.join(output, "manifest.webmanifest"),
  JSON.stringify({
    name: "NightWraith",
    short_name: "NightWraith",
    start_url: "/",
    background_color: "#000000",
    display: "minimal-ui",
    icons: iconSizes.map(size => ({
      src: `icons/icon-${size}x${size}.png`,
      sizes: `${size}x${size}`,
      type: "image/png",
    })),
  })
)

const sitemap = path.join(output, "sitemap")
await mkdir(sitemap, { recursive: true })
const origin = siteMetadata.siteUrl
await writeFile(
  path.join(sitemap, "sitemap-index.xml"),
  `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><sitemap><loc>${origin}/sitemap/sitemap-0.xml</loc></sitemap></sitemapindex>`
)
await writeFile(
  path.join(sitemap, "sitemap-0.xml"),
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${publicRoutes
    .map(
      route =>
        `<url><loc>${origin}${route}</loc><changefreq>daily</changefreq><priority>0.7</priority></url>`
    )
    .join("")}</urlset>`
)
await writeFile(
  path.join(output, "robots.txt"),
  `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap/sitemap-index.xml\nHost: ${origin}\n`
)
console.log(
  `Generated responsive assets for ${
    Object.keys(images).length
  } images, manifest, sitemap and robots.`
)
