# Phase 3 results — Vite + React static migration

## Summary

Implemented locally on `2026-facelift`, from Phase 2 commit `5f849ca`.
**No staging, commits, pushes, branch changes, PR changes, merges, or remote
Netlify/GitHub setting changes were performed.** This report is also unstaged.

The site now uses Vite + React 18 with Vike build-time prerendering. Every
requested route has its own meaningful initial HTML. The production deployment
is static files plus one native Netlify Function, not a client-only SPA or a
production React rendering server.

No redesign, new media features, photography, shows, merch integration, or
persistent player was introduced.

## Runtime and dependencies

| Tool | Validated version |
|---|---|
| Node | 22.23.4, unchanged pin |
| npm | 10.9.4 |
| React / React DOM | 18.3.1, retained |
| Vite | 8.3.5 |
| Vike | 0.4.268 |
| React Vite plugin | 6.1.2 |
| Sharp | 0.35.5 |

Validation used native macOS arm64 with isolated official Node/npm binaries,
not the host shell's default Node 20. The Node archive bundled npm 10.9.9;
validation explicitly selected npm 10.9.4.

Gatsby and all Gatsby plugins/transitive package entries are removed from the
lockfile. The new npm dependency audit reports **0 vulnerabilities** across
107 audited packages. This is npm advisory metadata, not an exploitability audit.

## Architecture

- [vite.config.mjs](./vite.config.mjs): React/Vike build, generated public assets,
  local ports, explicit local telemetry safety boundary.
- [src/pages/+config.js](./src/pages/+config.js): static prerendering, trailing
  slashes, server routing. Shared render hooks produce HTML and hydrate React.
- Each page's small `+config.js` imports its preserved component and SEO Head.
  Custom hooks retain React 18 without adding a React 19 framework integration.
- Normal navigation uses native links and full-document page loads. Cross-page
  playback still resets as before; persistent single-page sections are later work.
- [scripts/generate-assets.mjs](./scripts/generate-assets.mjs): responsive images,
  icons, manifest, robots, and sitemap. Originals are retained but not published.
- [scripts/finalize-build.mjs](./scripts/finalize-build.mjs): copies the generated
  custom error document to root `404.html` for Netlify static hosting.
- Build output: `dist/client`. `dist/server` is a prerender/build intermediate,
  not a deployed SSR service.

## Files changed

### Modified

- [package.json](./package.json): Gatsby replaced with Vite/Vike/Sharp, scripts
  retained through equivalent commands; real Node tests replace the placeholder.
- [package-lock.json](./package-lock.json): regenerated for the new dependency
  graph; required to remove stale Gatsby peer-resolution conflicts.
- [.gitignore](./.gitignore): generated Vite assets/output and Netlify state.
- [README.md](./README.md): current setup, commands, structure, image generation,
  local/provider testing boundaries, and warnings.
- [docs/NETLIFY-CONTRACTS.md](./docs/NETLIFY-CONTRACTS.md): current static/native
  hosting contract, historical evidence boundaries, manual preview checklist.

### Migrated/renamed source files

Shared components moved from `.js` to `.jsx` for standard Vite JSX handling:

- [src/components/form.jsx](./src/components/form.jsx)
- [src/components/header.jsx](./src/components/header.jsx)
- [src/components/layout.jsx](./src/components/layout.jsx)
- [src/components/seo.jsx](./src/components/seo.jsx)

Page components likewise moved to JSX:

- [src/pages/index.jsx](./src/pages/index.jsx)
- [src/pages/bio.jsx](./src/pages/bio.jsx)
- [src/pages/videos.jsx](./src/pages/videos.jsx)
- [src/pages/photos.jsx](./src/pages/photos.jsx)
- [src/pages/press.jsx](./src/pages/press.jsx)
- [src/pages/contact.jsx](./src/pages/contact.jsx)
- [src/pages/thanks.jsx](./src/pages/thanks.jsx)
- [src/pages/404.jsx](./src/pages/404.jsx)

Gatsby links/images/metadata queries are replaced, not page content or styling.
The metrics source moved from the Gatsby API convention to
[netlify/functions/sendMetric.mjs](./netlify/functions/sendMetric.mjs), retaining
ingestion behavior behind a native Netlify event adapter.

### Added

- [vite.config.mjs](./vite.config.mjs), [netlify.toml](./netlify.toml)
- [src/site.js](./src/site.js)
- [src/components/optimized-image.jsx](./src/components/optimized-image.jsx)
- [src/pages/+config.js](./src/pages/+config.js)
- [src/pages/+onRenderHtml.jsx](./src/pages/+onRenderHtml.jsx)
- [src/pages/+onRenderClient.jsx](./src/pages/+onRenderClient.jsx)
- Route configs in [src/pages/index/](./src/pages/index/),
  [bio/](./src/pages/bio/), [videos/](./src/pages/videos/),
  [photos/](./src/pages/photos/), [press/](./src/pages/press/),
  [contact/](./src/pages/contact/), [thanks/](./src/pages/thanks/),
  [404/](./src/pages/404/), and [_error/](./src/pages/_error/).
- [scripts/generate-assets.mjs](./scripts/generate-assets.mjs),
  [scripts/image-settings.json](./scripts/image-settings.json),
  [scripts/finalize-build.mjs](./scripts/finalize-build.mjs),
  [scripts/clean.mjs](./scripts/clean.mjs)
- [tests/metrics.test.mjs](./tests/metrics.test.mjs)
- [tests/static-build.mjs](./tests/static-build.mjs)
- This local report.

### Removed

Gatsby configuration files (`gatsby-config.js`, `gatsby-browser.js`,
`gatsby-ssr.js`), old `.js` locations of migrated JSX/API modules, and the unused
starter CSS module `src/components/index.module.css`.

The Node pin, existing GitHub Actions workflow, source image bytes, and
[src/components/layout.css](./src/components/layout.css) remain unchanged.

## Routes and SEO

| Route | Local development | Production preview | Static HTML |
|---|---|---|---|
| `/` | 200 | 200 | yes |
| `/bio/` | 200 | 200 | yes |
| `/videos/` | 200 | 200 | yes |
| `/photos/` | 200 | 200 | yes |
| `/press/` | 200 | 200 | yes |
| `/contact/` | 200 | 200 | yes |
| `/thanks/` | 200 | 200 | yes, noindex |

The build prerenders eight route documents including `/404/`, then copies the
error document to root `404.html`. Unknown URLs and both retired starter routes
return custom 404 content/status in local preview, not homepage fallback HTML.

A fresh Phase 2 Gatsby production build was retained temporarily for comparison.
For all seven routes plus the custom error page, final generated output matches:

- Titles, descriptions, canonical URLs, robots metadata, social metadata.
- Parsed homepage MusicGroup JSON-LD.
- Normalized main content text, ordered link destinations/navigation, iframe
  attributes, and complete form/field attributes.
- Existing source CSS byte for byte.
- Robots file byte for byte.

The sitemap remains at `/sitemap/sitemap-index.xml` with one shard and exactly
the six substantive canonical URLs. Thanks, errors, API, and retired starter
URLs are excluded.

## Contact and metrics

### Contact

The generated contact HTML retains `contact`, native POST to `/thanks/`,
`data-netlify="true"`, `netlify-honeypot="bot-field"`, hidden `bot-field`,
`form-name=contact`, and unchanged name/email/message fields.

The confirmation page retains conditional wording and does not claim delivery
on direct GET. No real form was submitted. Netlify detection, receipt, spam
classification, and notifications still require the manual preview test in
[NETLIFY-CONTRACTS.md](./docs/NETLIFY-CONTRACTS.md).

### Metrics

The public URL remains `/api/sendMetric`. A single exact Netlify rewrite proxies
to the native function. Existing names, UDP destination/protocol, ingestion
template, statuses, and JSON response conventions are preserved. No credential
value is added to browser code or documentation.

The adapter handles native/base64 JSON request bodies and returns explicit 400
for malformed JSON. Five mocked tests exercise method/input handling, both
success encodings, callback failure, response JSON, and socket cleanup.

Native esbuild ZIP packaging succeeded using Netlify's
`@netlify/zip-it-and-ship-it` 16.5.1 in isolated temporary tooling. The TOML was
also parsed and the exact public rewrite/publish contract checked.
Packaging success is **not** deployed routing or ingestion proof.

Local development and preview deliberately return **503 JSON** at this endpoint
without running UDP ingestion. The existing effects log the explanatory message.
An explicit local POST confirmed this behavior. Production uses the native
function; its behavior is not replaced with the local response.

No test sent production telemetry. Browser requests against the Gatsby baseline
went only to its temporary static localhost server, which had no metrics handler.

## Media and visible differences

Source images, page CSS, text, navigation, fonts, and iframe URLs remain.
Thirty existing optimized-image sources generate 360 AVIF/WebP/JPEG-or-PNG
variants: **10,543,668 bytes total**, largest **250,113 bytes**. Large original
photographs are not copied into published output.

Browser comparisons at 1440px and 390px found:

- Homepage, Bio, and Contact main/header dimensions unchanged.
- Photos main height changed by 1px desktop / about 2.46px mobile overall.
  Individual image differences were at most 1px due to responsive re-encoding
  and dimension rounding.
- Every checked main image decoded successfully.
- Existing CSS and image source bytes are unchanged.

No intentional visual redesign. Gatsby's blurred loading placeholders are
replaced with reserved-dimension, lazy native picture images. Compression,
first-load placeholders, and tiny rounding differences are the expected visible
changes. Full-page navigation is intentional for this architecture phase.

Actual audio/video playback and provider-specific mobile behavior were not
certified; embed attributes/URLs are preserved and should be manually checked.

## Commands executed and results

All npm commands below used the isolated Node 22.23.4/npm 10.9.4 PATH.
The final reproducibility run executed:

```sh
node --version
npm --version
shasum -a 256 package-lock.json
npm ci
npm run clean
npm run build
npm test
npm run test:build
npm exec --no -- prettier --check \
  'src/**/*.jsx' 'src/**/+config.js' src/site.js \
  'scripts/*.mjs' scripts/image-settings.json 'tests/*.mjs' \
  'netlify/functions/*.mjs' vite.config.mjs package.json
shasum -a 256 package-lock.json
```

Results:

- Clean installation: 106 installed packages, 107 audited, zero advisories.
- Cold asset generation and production build: passed; eight prerendered HTML
  documents and root error-page copy.
- Metrics tests: 5/5 passed, mocked UDP only.
- Static build tests: 5/5 passed.
- Prettier check: passed.
- Lockfile SHA256 unchanged before/after `npm ci`:
  `8f8a93e500968c0131a88b545e426e42a83b69daffc6650a1ac0e1f019dcb33f`.

Also executed during implementation:

```sh
npm install
npm run dev
npm run build
npm run serve
npm ls --depth=0
git branch --show-current
git status --short
git diff --check
git diff --cached --name-only
git diff --name-only -- src/images src/components/layout.css .nvmrc .github/workflows/build.yml
```

- Development served all seven routes plus custom 404; browser route loop
  reported no runtime/hydration errors.
- Production preview served all seven routes; browser loop reported no runtime
  errors or failed local assets, and Bio navigation/back returned home correctly.
- Temporary Python HTML parsing compared final output against the actual Gatsby
  baseline and checked local assets, sitemap, robots, retired routes, and private
  server configuration absence from every published file: passed.
- Browser geometry/image-decode comparisons covered homepage, Bio, Photos,
  Contact at desktop/mobile widths. Existing Gatsby baseline hydration errors
  were observed; Vite-only browser verification reported none.
- Netlify library `zipFunctions(..., { config: { "*": {
  nodeBundler: "esbuild" } } })` packaged the final function successfully.
- Local `curl` POST to `/api/sendMetric`: explicit 503 JSON, no UDP handler.
- Protected source images/CSS/runtime/CI had no Git diff; index had no changes.

Build/preview servers were restarted after rebuilding to avoid stale preview
artifact metadata. Temporary validation servers are stopped after use.
Temporary Gatsby snapshots/dependency backups, conversion/comparison scripts,
function packaging tools/ZIPs, and isolated Phase 3 runtime copies were removed
after verification. Current dependencies and generated Vite output remain.

## Failed attempts resolved during implementation

1. Reusing the Gatsby lockfile for the new graph produced ERESOLVE on stale
   Gatsby/Babel peers. Regenerating the lockfile with normal npm installation
   resolved it; no force/legacy flags or audit fix.
2. Vike rejected different environment settings for Page/Head exports from the
   same module. Shared metadata environment fixed the configuration.
3. Initial function adapter placement caused a syntax error. Corrected before
   the five passing unit tests and final packaging.
4. Initial React hydration exposed iframe raw-text fallback children. Preserved
   hardcoded fallback HTML through correct serialization and used valid inline
   image wrappers inside footer paragraphs. Final browser hydration passed.
5. Baseline JSON-LD parsing caught HTML-escaped JSON from plain React SSR script
   children. Safe raw JSON serialization fixed it; parsed schema now matches.
6. A new test initially expected uppercase `POST`; the existing preserved form
   uses lowercase `post`. Corrected the test, not the form.
7. Baseline comparison caught a missing legacy viewport `shrink-to-fit=no`;
   restored it.
8. Rebuilding while preview was still running caused a stale Content-Length
   read error. Restarted preview against final output and reran successfully.
9. IDE unit-test discovery did not recognize the Node `.mjs` tests; actual npm
   Node test-runner commands above succeeded.
10. Some browser-tool pages expired/interception attempts timed out. Fresh page
    checks succeeded; no expired-page call is counted as a passing test.

## Known warnings and remaining boundaries

- npm 10.9.4 marks Sharp's optional WASM fallback packages
  `@img/sharp-wasm32`, `@emnapi/runtime`, and `tslib` as extraneous in `npm ls`.
  They are optional lockfile entries installed by clean `npm ci`; native image
  generation and all builds pass. No workaround or forced pruning.
- Existing React development warnings remain for legacy `allowfullscreen`,
  unused misspelled `netifly`, and SEO function `defaultProps`.
- Spotify's `allow`/`allowfullscreen` precedence warning remains.
- Local metrics 503 is deliberate and visible, not a failed production API test.
- `vike preview` correctly warns that static output should be deployed instead
  of the preview server.
- Old Gatsby browser tabs can continue polling `/__webpack_hmr` and generate
  harmless local 404 logs; reload/close them rather than adding obsolete routes.
- GitHub-hosted CI, Netlify CLI/Dev/full provider build, actual deployed routing,
  real form submission/notification, remote ingestion, Intel macOS, and Rosetta
  were not executed or claimed as verified.
- Existing server ingestion configuration remains server-only. Moving it to
  environment-based management/rotating it requires separately approved work;
  no credential value is reproduced here.

No implementation task is blocked locally. Deployment acceptance remains
pending owner-controlled preview verification.

## Netlify settings to verify after pushing

1. Build `npm run build`; publish `dist/client`; functions `netlify/functions`;
   Node 22.23.4/npm 10.9.4 in actual deploy logs.
2. Base/package directories and all context/dashboard overrides.
3. Disable/remove any old dashboard Essential Gatsby plugin; preserve native
   function packaging and the exact API rewrite.
4. No SPA catch-all or stale Gatsby routing/headers interfering with real 404s.
5. Seven initial-HTML pages, canonical SEO, six-URL sitemap, noindex thanks,
   retired URL 404s, assets, and real provider playback.
6. Complete the documented deliberate form detection/submission/receipt test.
7. API GET 405 JSON; any actual ingestion check separately approved and directed
   at non-production instrumentation.

## Recommended next step

Review these unstaged changes, run the documented local commands, and use an
owner-controlled deploy preview for the Netlify acceptance checklist before
starting visual changes. Once architecture parity is accepted, plan the
single-page section/persistent-media phase independently from visual redesign.
