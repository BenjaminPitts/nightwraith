# NightWraith

The official NightWraith band website: <https://nightwraithband.com/>.
Built with **Vite, React 18, and Vike static prerendering**, hosted on Netlify.
Each page has its own generated HTML, content, and metadata before JavaScript runs.
There is no client-only SPA fallback or production rendering server.

## Prerequisites

- Git and [nvm](https://github.com/nvm-sh/nvm).
- **Node.js 22.23.4**, pinned in [.nvmrc](./.nvmrc).
- **npm 10.9.4**, used for validation and CI.

Package engines are advisory, not strictly enforced. No global framework CLI is
needed. If necessary, select npm once after activating the project Node version:

```sh
npm install --global npm@10.9.4
```

## Getting started

```sh
git clone https://github.com/BenjaminPitts/nightwraith.git
cd nightwraith
nvm install
nvm use
npm ci
npm run dev
```

Open <http://127.0.0.1:8000/>. Stop with Ctrl+C. `npm run develop` and `npm start`
remain aliases. Use the committed lockfile; do not use `--force` or
`--legacy-peer-deps` to hide dependency conflicts.

The startup script generates responsive images and other static assets before
Vike starts. The first run takes longer; unchanged image variants are reused.
After replacing source images while the server is running, stop and restart it
to regenerate assets.

## Production build, preview, and checks

Stop development/preview servers before rebuilding or cleaning.

```sh
npm run build
npm run serve
```

Open <http://127.0.0.1:9000/>. Deployable static output is `dist/client/`.
`dist/server/` is a build/prerender intermediate, not a Netlify SSR deployment.
Vike's preview warning correctly says to deploy the static files in production.

```sh
npm test
npm run test:build
```

`npm test` uses mocked UDP sockets to check the native metrics function without
sending telemetry. `npm run test:build` requires a completed build and checks
prerendered routes, SEO/JSON-LD, the static form, sitemap, assets, and absence of
server ingestion configuration from published files.

For stale generated assets/cache or a cold build:

```sh
npm run clean
npm run build
```

Cleaning removes only `dist/`, `.generated/`, and Vite's dependency cache.
It is not required on every startup.
Reload or close browser tabs left open from Gatsby; their obsolete
`/__webpack_hmr` polling can otherwise produce harmless local 404 requests.

## Images and native dependencies

Original photography/artwork remains in [src/images/](./src/images/), but large
originals are not copied to the website. Sharp generates responsive AVIF, WebP,
and JPEG/PNG variants using the previous image widths/quality settings in
[scripts/image-settings.json](./scripts/image-settings.json). The shared image
component reserves dimensions and provides lazy loading and format fallbacks.
Its width/quality props must match the registration; use wrapper styles to cap
display size when sharing a registration. The homepage hero loads eagerly.
Current variants are cached; obsolete generated variants are pruned on the next
asset run. Source photographs are never pruned. The header logo is Vite-managed;
16px/32px favicons and manifest icons use the NightWraith logo with proportional
black padding.

If Sharp or Vite's native tooling fails after switching Node/CPU architecture,
stop the server and reinstall under the pinned runtime:

```sh
nvm use
npm ci
npm run clean
npm run dev
```

Do not copy `node_modules` between machines/architectures or force incompatible
dependencies. Retain the exact installation error if downloads fail.
Avoid mixing Rosetta/x64 Node with arm64 modules on Apple Silicon.

## Repository structure

- [src/pages/](./src/pages/): preserved page content and per-route Vike configs;
  shared server/client render hooks.
- [src/components/](./src/components/): layout, header, SEO, form, responsive image
  component, and unchanged CSS.
- [src/site.js](./src/site.js): canonical site metadata and six sitemap routes.
- [src/images/](./src/images/): retained source images.
- [scripts/](./scripts/): assets, sitemap/robots/manifest, clean, and static 404.
- [netlify/functions/](./netlify/functions/): server-only metrics ingestion.
- [netlify.toml](./netlify.toml): static build/publish settings and API rewrite.
- [tests/](./tests/): Node tests, including Sharp-based icon checks.
- [.github/workflows/](./.github/workflows/): existing PR install/build check.
- `.generated/` and `dist/`: ignored generated output.

Normal page links use full-document navigation. Spotify playback is not
persistent across page navigations.

## Netlify and integration testing

Committed settings use `npm run build`, publish `dist/client`, and package
`netlify/functions`. `/api/sendMetric` rewrites only to the native metrics
function; there is deliberately no `/* /index.html 200` fallback.

**Before deploying, verify dashboard/context overrides and remove or disable any
old Essential Gatsby build plugin.** No remote settings were changed.

No production credentials are needed to render pages. Local development and
preview deliberately return explicit **503 JSON** from `/api/sendMetric` instead
of executing ingestion. The existing page effects log that explanatory response;
the browser's 503 resource warning is expected. Production uses the native
function and preserves its existing metric names, payload, and responses.

Netlify CLI is optional for frontend work. Netlify Dev/build can be used for
provider routing/function integration, but that CLI workflow was not tested
here and may execute real ingestion if the function is called. Do not send live
telemetry or form submissions as casual local tests.

The unchanged contact form is present in generated HTML for Netlify detection.
Its native POST returns to `/thanks/`, which remains noindex and does not claim
delivery on direct visits. Local preview does not implement Netlify Forms.
Verify form detection, receipt/notifications, and function routing separately on
an owner-approved deploy preview.

See [Netlify hosting contracts](./docs/NETLIFY-CONTRACTS.md) for the migration's
hosting contract, evidence boundaries, and manual acceptance checklist. Its
historical content/asset comparisons are not a current live-site SEO audit.

## Known limitations

- npm 10.9.4 installs Sharp's optional WASM fallback packages but marks
  `@img/sharp-wasm32`, `@emnapi/runtime`, and `tslib` as extraneous in `npm ls`.
  Native image generation succeeds; do not prune or force-install packages just
  to hide these optional-package diagnostics.
- Third-party embeds can emit provider-controlled browser warnings.

Actual audio/video playback, Netlify form receipt, notifications, and remote UDP
ingestion require manual integration verification. nvm/global npm setup commands
are setup guidance, not commands run automatically by the site.
