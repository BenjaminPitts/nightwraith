import React from "react"
import { renderToString } from "react-dom/server"
import { escapeInject, dangerouslySkipEscape } from "vike/server"

export function onRenderHtml(pageContext) {
  const { Page, config } = pageContext
  const Head = config.Head
  const head = renderToString(<Head />)
  const body = renderToString(<Page />)

  return escapeInject`<!DOCTYPE html>
    <html lang="en" style="background-color:#000">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        ${dangerouslySkipEscape(head)}
        <link rel="icon" type="image/png" href="/favicon-32x32.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="sitemap" type="application/xml" href="/sitemap/sitemap-index.xml" />
      </head>
      <body style="background-color:#000">
        <div id="root">${dangerouslySkipEscape(body)}</div>
      </body>
    </html>`
}
