import { copyFile } from "node:fs/promises"

await copyFile(
  new URL("../dist/client/404/index.html", import.meta.url),
  new URL("../dist/client/404.html", import.meta.url)
)
