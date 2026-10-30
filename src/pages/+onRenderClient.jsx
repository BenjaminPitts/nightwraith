import React from "react"
import { hydrateRoot } from "react-dom/client"

export function onRenderClient({ Page }) {
  hydrateRoot(document.getElementById("root"), <Page />)
}
