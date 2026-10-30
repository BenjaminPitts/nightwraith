import { rm } from "node:fs/promises"

await Promise.all(
  ["dist", ".generated", "node_modules/.vite"].map(path =>
    rm(new URL(`../${path}`, import.meta.url), { recursive: true, force: true })
  )
)
