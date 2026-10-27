import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import vike from "vike/plugin"

function localMetrics() {
  const configure = server => {
    server.middlewares.use("/api/sendMetric", (_request, response) => {
      response.statusCode = 503
      response.setHeader("Content-Type", "application/json")
      response.end(
        JSON.stringify({
          status: "error",
          message:
            "Metrics require Netlify Functions. Local telemetry is disabled.",
        })
      )
    })
  }
  return {
    name: "local-metrics-disabled",
    configureServer: configure,
    configurePreviewServer: configure,
  }
}

export default defineConfig({
  plugins: [react(), vike(), localMetrics()],
  publicDir: ".generated/public",
  server: { host: "127.0.0.1", port: 8000, strictPort: true },
  preview: { host: "127.0.0.1", port: 9000, strictPort: true },
})
