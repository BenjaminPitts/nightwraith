# NightWraith Netlify hosting contracts

Updated for Phase 3 on local `2026-facelift`, from Phase 2 commit `5f849ca`.
The architecture is now Vite + React with Vike static prerendering, not Gatsby.
No remote settings, deploys, branches, commits, or pull requests were changed.

## Evidence categories

- **Verified from repository code:** declarations in this working tree.
- **Verified by local tests:** generated artifacts, local HTTP/browser tests,
  mocked UDP tests, and native Netlify function ZIP packaging.
- **Verified from accessible Netlify deployment evidence:** historical public GET
  observations recorded during Phase 2, explicitly not this migration.
- **Unknown / requires manual Netlify dashboard verification:** live build
  overrides, plugins, form acceptance, notifications, routing, and ingestion.

A successful static build or function ZIP is not proof of deployed integration.
Do not record secret environment-variable or ingestion configuration values.

## Build, runtime, and deployment

### Verified from repository code

[netlify.toml](../netlify.toml) explicitly declares:

| Setting | Contract |
|---|---|
| Build command | `npm run build` |
| Publish directory | `dist/client` |
| Function directory | `netlify/functions` |
| Function bundler | `esbuild` |
| Build Node | `22.23.4` |
| Build npm | `10.9.4` |
| API rewrite | `/api/sendMetric` -> `/.netlify/functions/sendMetric`, forced HTTP 200 rewrite |

The 200 rewrite is an internal proxy rule, not a guarantee of a 200 function
response. Handler errors still return their own status codes.

[package.json](../package.json) and the regenerated npm v3 lockfile replace Gatsby
with Vite, Vike, the React plugin, and current Sharp. React remains 18.3.1 in the
lockfile. [.nvmrc](../.nvmrc) is unchanged. Advisory package engines match.

`npm run build` generates images/icons/manifest/sitemap/robots, builds Vike, and
copies the prerendered custom error page to `dist/client/404.html`.
`dist/server` is a build intermediate and is **not** the publish directory.
Each route has real static HTML; no production SSR adapter or SPA fallback is
required. Existing GitHub PR CI still runs `npm ci` and `npm run build`.

No `_headers`, catch-all rewrite, environment-dependent page rendering, or new
build plugin is introduced. Existing Gatsby configuration and API conventions
are removed only after replacements are implemented.

### Verified by local tests

- Clean installation and cold production build on Node 22.23.4/npm 10.9.4, arm64.
- Eight route documents: seven site/return pages plus `/404/`; root `404.html`
  is an additional copy for static hosting.
- Local development and production preview serve all seven routes.
- Retired starter URLs and unknown routes return custom 404 content/status.
- The native function is packaged successfully with Netlify's
  `@netlify/zip-it-and-ship-it` using esbuild, installed only in temporary test
  tooling, not as a website dependency.
- No Gatsby package remains in the lockfile.

### Unknown / requires manual Netlify dashboard verification

Before deploying this migration, inspect:

1. Linked repository/branch, base/package directories, context-specific build
   overrides, and actual `dist/client` publish path.
2. Node/npm selected in build logs. `.nvmrc` can affect Netlify's runtime
   selection; compare it with `NODE_VERSION` and other scoped overrides.
   The official Node archive used here bundles npm 10.9.9, so explicit npm
   selection matters.
3. **Keep the dashboard-installed Essential Gatsby plugin while `main` still
  uses Gatsby.** UI-installed plugins run in all deploy contexts; removing it
  would also affect production. This branch's `netlify.toml` sets
  `NETLIFY_SKIP_GATSBY_BUILD_PLUGIN = "true"` only under
  `[context.deploy-preview.environment]`. Plugin 3.8.4 explicitly checks this
  flag before its build lifecycle work, including the image-CDN cache write.
  This skips Gatsby work for deploy previews using this configuration, not
  production or branch deploys; native Netlify Functions remain enabled.
  Confirm the resolved preview environment and successful post-build steps in
  the next Netlify log. A local `npm run build` does not run Netlify plugins.
  See [Netlify plugin context rules](https://docs.netlify.com/extend/install-and-use/build-plugins/#configure-by-deploy-context)
  and the [3.8.4 skip guard](https://unpkg.com/@netlify/plugin-gatsby@3.8.4/lib/helpers/config.js).
4. Existing dashboard redirects/headers, domain aliases, slash normalization,
   build cache, framework autodetection, and install flags. Do not retain an
   unrelated SPA fallback that turns missing URLs into homepage HTTP 200.
5. Actual function inventory, runtime, permissions, timeouts, outbound UDP
   behavior, and whether account-level settings interfere with the API rewrite.

Repository configuration is explicit now, but inaccessible dashboard/context
settings have not been assumed or edited. No speculative override of the
production function runtime is included.

## Contact form and return route

### Verified from repository code

[src/components/form.jsx](../src/components/form.jsx) preserves:

| Contract | Value |
|---|---|
| Form name | `contact` |
| Submission | Native browser POST, default URL-encoded fields |
| Action | `/thanks/` on the current origin |
| Detection | `data-netlify="true"` |
| Honeypot declaration/field | `netlify-honeypot="bot-field"` / hidden `bot-field` |
| Hidden form identity | `form-name=contact` |
| User fields | `name`, `email`, `message` |

The existing misspelled `netifly` prop is not Netlify detection; the correct
attributes remain. No AJAX handler, field rename, validation change, or new spam
protection was introduced. The full form is prerendered into
`dist/client/contact/index.html`, so detection does not depend on hydration.

[src/pages/thanks.jsx](../src/pages/thanks.jsx) retains the existing layout,
conditional confirmation wording, homepage/contact links, self-canonical URL,
and `noindex, nofollow`. It is excluded from the sitemap.

A static GET cannot authenticate successful form delivery versus a bookmark.
The page does not claim receipt and does not use a query flag/referrer as proof.
Its existence is not proof Netlify accepted a POST.

### Verified by local tests

Generated contact attributes/fields match the Gatsby baseline exactly.
Return-page copy, SEO, links, and initial HTML also match. No form was submitted.
Vite/Vike preview does not provide Netlify Forms processing.

### Exact manual deploy-preview acceptance test

After the owner deploys through their normal workflow:

1. Confirm preview commit/context, build settings, static output, and form
   detection enabled in the dashboard.
2. Confirm `contact` is recognized with the existing fields; identify where
   preview submissions and notifications are recorded.
3. GET `/thanks/` directly: no false claim that a message was received.
4. Open preview `/contact/`. Enter an owner-approved test name/email and unique
   `Phase 3 preview verification <timestamp>` marker; leave the honeypot blank.
5. Submit once. Inspect the native POST to preview `/thanks/`, URL-encoded
   `form-name=contact` and user fields, response/redirect chain, and return page.
   Record actual statuses instead of assuming a particular redirect status.
6. Confirm the marker appears as an accepted submission, not only spam.
   Independently verify notifications if configured.
7. Check direct return-page access, keyboard/homepage links, and failure/offline
   behavior. A static-page GET is not a substitute for confirmed receipt.

Do not run this against production without explicit approval.

## Metrics endpoint

### Verified from repository code

[netlify/functions/sendMetric.mjs](../netlify/functions/sendMetric.mjs) replaces
the Gatsby `src/api` handler. Its native Netlify event adapter accepts the same
POST JSON payload and preserves the internal ingestion implementation.

- Public route: `/api/sendMetric` via the exact rewrite in
  [netlify.toml](../netlify.toml); no broad API or SPA rewrite.
- Payload: `{ "metricName": "<existing name>" }`.
- Page effects still send `indexpage.load`, `bio`, `photos`, `press`, `contact`.
  Videos still does not emit a page-load metric.
- Existing StatsD counter format, UDP4, host `statsd.hostedgraphite.com`, and
  port 8125 are unchanged.
- Existing server-only ingestion configuration remains in the function; no
  credential value is printed here, copied to frontend configuration, or added
  to documentation. No new application environment-variable requirement.
- Missing metric: 400; non-POST: 405; UDP callback failure: 500; callback success:
  200, with existing JSON conventions.
- The adapter also handles Netlify base64 request bodies and explicitly rejects
  malformed JSON with 400.
- UDP callback success is not a Hosted Graphite ingestion acknowledgement.

### Verified by local tests

- Five Node tests mock `dgram.createSocket`; success, callback failure, methods,
  missing input, malformed JSON, and base64 handling are covered. No UDP packet
  is sent.
- Native function ZIP packaging succeeds with Netlify's packaging library.
- Baseline ingestion template matches the server function. Its private prefix
  is absent from every file in `dist/client`.
- The existing React page effects retain their metric names.

Development/preview intentionally return explicit 503 JSON at `/api/sendMetric`
through [vite.config.mjs](../vite.config.mjs). No ingestion runs locally. This is
a documented development-only safety boundary, not a fake successful metric.
The existing browser effects log the explanatory response. Vite preview alone
cannot prove Netlify routing works.

### Manual integration verification

First use a safe GET on the approved preview: `/api/sendMetric` must return 405
with the existing JSON message, not HTML or a missing function.
Inspect native function inventory/logs and rewrite ordering.

Actual POST/ingestion testing requires an owner-approved non-production
destination/series and explicit approval. Verify HTTP status and remote
ingestion separately. Do not emit production counters merely to test routing.
Netlify Dev/CLI execution was not validated and can run the real function.

## Routes, metadata, assets, and retirement

### Verified from repository code and local tests

- Canonical origin remains `https://nightwraithband.com`.
- `/`, `/bio/`, `/videos/`, `/photos/`, `/press/`, `/contact/`, `/thanks/` all
  have route-specific initial HTML. No single-index fallback masquerades as SSG.
- Titles/descriptions, canonicals, social metadata, MusicGroup JSON-LD, visible
  page text, links, navigation destinations, form contracts, and iframe
  attributes match the fresh Phase 2 Gatsby build.
- [src/site.js](../src/site.js) supplies metadata and six sitemap routes;
  [src/components/seo.jsx](../src/components/seo.jsx) renders existing metadata.
  JSON-LD uses safe raw script serialization so it remains valid JSON.
- [scripts/generate-assets.mjs](../scripts/generate-assets.mjs) emits
  `/sitemap/sitemap-index.xml`, `/sitemap/sitemap-0.xml`, and `/robots.txt`.
  Exactly six canonical URLs appear; return/error/API/starter URLs do not.
  Robots output matches the Gatsby baseline byte for byte.
- Existing CSS and source images remain unchanged. Responsive AVIF/WebP and
  JPEG/PNG assets replace Gatsby transforms; the 30 image sources generate
  360 variants totaling about 10.54 MB, largest about 250 KB. The original
  high-resolution photos are retained but not published.
- Iframe URLs/attributes remain unchanged. Their raw-text fallback markup is
  serialized without React child hydration mismatches. Image wrappers use
  inline spans to remain valid inside footer paragraphs.
- The favicon/manifest use the existing artwork and display settings, with new
  deterministic asset filenames. No service worker is introduced.
- Navigation uses ordinary page links. **Persistent cross-page playback is not
  implemented in Phase 3**; a later single-page section architecture is still
  required. This supersedes Phase 2's aspirational migration checklist wording.

The retired starter routes have no meaningful replacement. A real 404 remains
appropriate even if indexed; 410 would require a separately approved explicit
hosting rule. Do not redirect them to unrelated homepage content.
After deploying, check slash and non-slash variants of retired/unknown URLs for
real 404 status and custom content, not stale cached pages.

## Historical public deployment evidence

Phase 2 recorded read-only GETs on October 26, 2026:

| Origin | `/contact/` | `/thanks/` | `/api/sendMetric` GET |
|---|---|---|---|
| `https://nightwraithband.com` | 200 | 404 | 405 JSON |
| `https://deploy-preview-7--sprightly-biscochitos-f0b9dc.netlify.app` | 200 | 404 | 405 JSON |

Both reported `Server: Netlify`. Contact HTML was consistent with Netlify's form
post-processing. These observations concern older deploys and do not establish
current form receipt, dashboard settings, Phase 2 deployment status, or Phase 3
deployment success. No new remote deployment evidence is claimed here.

## Owner's deployment acceptance checklist

- Correct preview commit/context, `npm run build`, `dist/client`, native
  functions, intended Node/npm, no stale Gatsby plugin.
- Seven routes contain meaningful HTML before JS; navigation, assets, mobile
  display, external players, and custom 404 work.
- Retired routes return 404; no broad SPA fallback.
- Titles/descriptions/canonicals/social tags/schema remain correct.
- Sitemap has exactly six canonical pages; thanks is noindex.
- Contact is detected and the deliberate preview submission/notification test
  passes independently of the return-page GET.
- API GET returns 405 JSON; any ingestion check is separately approved and
  non-production.
- Dashboard-managed redirects/headers, domain configuration, runtime limits,
  environment-variable names/scopes, and notifications are reviewed without
  copying secret values.

## References

- [Vike prerendering](https://vike.dev/prerender)
- [Netlify build configuration](https://docs.netlify.com/build/configure-builds/file-based-configuration/)
- [Netlify runtime selection](https://docs.netlify.com/build/configure-builds/manage-dependencies/)
- [Netlify Forms](https://docs.netlify.com/manage/forms/setup/)
- [Netlify Functions](https://docs.netlify.com/build/functions/overview/)
