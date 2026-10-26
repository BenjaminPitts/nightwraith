# NightWraith Netlify hosting contracts

Inspected October 26, 2026 on local `2026-facelift`, starting from Phase 1 commit
`2d046a1`. This document describes the existing Gatsby site and Phase 2 cleanup,
not a new deployment configuration. No remote settings were changed.

## Evidence categories

- **Verified from repository code:** declarations and source behavior visible in
  the local tree.
- **Verified by local tests:** generated HTML/artifacts or read-only HTTP checks
  from a local production preview.
- **Verified from accessible Netlify deployment evidence:** public GET responses.
  These concern already-deployed versions, not the uncommitted Phase 2 changes.
- **Unknown / requires manual Netlify dashboard verification:** private build,
  form, runtime, integration, or delivery settings not established by those tests.
- Official platform documentation describes supported behavior; it does not prove
  which options this particular site has configured.

## Build, framework detection, and runtime

### Verified from repository code

- [package.json](../package.json): Gatsby 4, React 18, `npm run build` executes
  `gatsby build`; `npm run dev` executes `gatsby develop`; `npm run serve`
  executes `gatsby serve`.
- [.nvmrc](../.nvmrc): Node `22.23.4`.
- Package engines: Node `22.23.4`, npm `10.9.4`, advisory rather than strict.
- [package-lock.json](../package-lock.json): npm lockfile v3.
- [.github/workflows/build.yml](../.github/workflows/build.yml): PR-only
  install/build checks using `.nvmrc`, npm 10.9.4, `npm ci`, `npm run build`.
  This is GitHub CI, not a Netlify deployment configuration.
- No committed `netlify.toml`, `_redirects`, `_headers`, Netlify functions
  directory, or explicit Netlify build-plugin configuration.
- No explicit `gatsby-plugin-netlify` or `@netlify/plugin-gatsby` dependency.
- No Gatsby redirect generation or application environment-variable reads.
- The removed `gatsby-node.js` contained only the unwanted DSG demo registration.

### Verified by local tests

- Node 22.23.4/npm 10.9.4 build the site with the installed locked dependency set.
- Build output is `public/`; static pages include route-specific initial HTML.
- Both baseline and Phase 2 builds compile Gatsby Functions.
- Tests use disposable filesystem snapshots of the local source and dependency
  tree so the user's running development server/cache are not disturbed. No
  branch creation/switching, staging, or fresh dependency installation is needed.
- A production build is not proof of Netlify form processing, notification
  delivery, function packaging, or metric ingestion.

### Framework and version detection: documented Netlify behavior

Netlify detects Gatsby from a linked repository and suggests `gatsby build` and
`public`. For Gatsby versions before 5.12, its Essential Gatsby build plugin is
the documented integration for Gatsby Functions and SSR/DSG.

The site's actual build command/base/publish settings and plugin installation
must still be checked in the dashboard and logs. Absence of a repository plugin
declaration does not establish absence of a dashboard-installed plugin.

Netlify's dependency documentation says `.nvmrc` in the build base directory can
override the dashboard's Node selection. Thus the Phase 1 pin is **not guaranteed
to be local-only**. Check any `NODE_VERSION` setting, `.node-version`, base
directory, and the version actually selected in deploy logs; do not infer
precedence between conflicting overrides without inspecting the build.

npm ordinarily defaults to the version bundled with Node unless `NPM_VERSION`
or other explicit tooling selection changes it. Package engines and the GitHub
Actions npm selection do not prove Netlify uses npm 10.9.4. The official Node
22.23.4 archive fetched in Phase 2 bundled npm 10.9.9, so testing selected npm
10.9.4 separately. Verify Netlify's effective npm version and install command;
do not assume its installer runs `npm ci` because GitHub CI does.

No `netlify.toml` is added: the dashboard settings are unknown, and an apparently
harmless file could override existing build/context/plugin behavior.

## Contact form and return route

### Verified from repository code

[src/components/form.js](../src/components/form.js) is unchanged:

| Contract | Value |
|---|---|
| Form name | `contact` |
| Submission | Native browser POST; no custom AJAX handler |
| Action | `/thanks/` on the current origin |
| Encoding | Native default URL-encoded fields; no file upload |
| Detection | `data-netlify="true"` |
| Honeypot declaration | `netlify-honeypot="bot-field"` |
| Hidden fields | `bot-field`, `form-name=contact` |
| User fields | `name`, `email`, `message` |

The existing misspelled `netifly` attribute is not the detection mechanism and is
left untouched; the correct `data-netlify` attribute is present. Existing lack
of explicit labels/required-field validation is not changed in this phase.

[src/pages/thanks.js](../src/pages/thanks.js) provides a static return destination,
uses the existing layout/SEO helper, and includes homepage/contact links.
It is `noindex, nofollow` and explicitly excluded from the sitemap. Its canonical
is `https://nightwraithband.com/thanks/`.

A static GET page cannot authenticate a successful Netlify POST redirect versus
a bookmark/direct visit. The page therefore thanks users **conditionally** after
a successful submission and explicitly says it cannot verify delivery. It does
not claim a message was received. No referrer, query parameter, or local-storage
flag is treated as proof; no submission-handler change was needed.

### Verified by local tests

- Static contact HTML retains the form declaration, action, method, honeypot,
  and every field.
- `/thanks/` is generated, serves HTML, and contains its noindex/canonical data,
  conditional copy, and links.
- Baseline and final contact form contracts match.
- Tests did not POST any form or claim actual receipt.

### Verified from accessible Netlify deployment evidence

Read-only GET requests on October 26, 2026:

| Origin | `/contact/` | `/thanks/` | `/api/sendMetric` GET |
|---|---|---|---|
| `https://nightwraithband.com` | 200 | 404 | 405 JSON |
| `https://deploy-preview-7--sprightly-biscochitos-f0b9dc.netlify.app` | 200 | 404 | 405 JSON |

Both origins report `Server: Netlify`. The contact HTML retains the form name,
POST action, hidden form-name and honeypot fields; the detection attribute is
absent from deployed markup, consistent with Netlify processing. This does
**not** establish that form detection is currently enabled, submissions are
accepted, spam checks allow a message, or email notifications arrive.

The preview is historical Phase 1 evidence, not a Phase 2 deployment. Phase 2
has not been pushed or deployed by this work.

### Unknown / requires manual Netlify dashboard verification

- Whether form detection is enabled for relevant deploy contexts.
- Whether Netlify lists `contact` with the expected fields.
- Submission/spam status, quotas, notification configuration, and recipients.
- Preview-specific form availability and isolation from production records.

### Exact manual deploy-preview acceptance test

After the owner deploys the reviewed changes through their normal workflow:

1. In Netlify, verify the preview commit/context and effective build settings.
2. Verify form detection is enabled and `contact` is recognized with the same
   fields. Confirm where preview submissions/notifications are recorded.
3. GET `/thanks/` directly: it must render without claiming a message was sent.
4. Open `/contact/` on that preview origin. Use an owner-approved test name and
   email, a unique marker such as `Phase 2 preview verification <timestamp>`,
   and leave the honeypot blank. This is a deliberate manual integration test,
   not an automated production submission.
5. Submit once. In browser Network, verify a native POST to preview `/thanks/`,
   URL-encoded payload containing `form-name=contact` and expected fields, no
   error response, and the resulting confirmation page. Record the observed
   response/redirect chain rather than assuming a particular status code.
6. Confirm the unique marker exists in Netlify Forms under the correct form and
   is not only classified as spam. Separately verify notifications if configured.
7. Check direct navigation, keyboard/homepage link behavior, noindex metadata,
   and an offline/failure attempt that must not be reported as a successful send.
8. A confirmation-page GET or successful static build alone is a failed
   substitute for steps 5-6. If receipt is missing, investigate Netlify processing
   before changing field names or replacing the integration.

Do not perform this test against live production without explicit owner approval.

## Metrics endpoint

### Verified from repository code

[src/api/sendMetric.js](../src/api/sendMetric.js) remains unchanged:

- Gatsby Function at `/api/sendMetric`.
- POST JSON `{ "metricName": "<existing name>" }`.
- Names currently sent by page effects: `indexpage.load`, `bio`, `photos`,
  `press`, `contact`. Videos does not send an equivalent page-load metric.
- Sends a StatsD counter using Node `dgram`, UDP4, port 8125,
  `statsd.hostedgraphite.com`.
- Server-side ingestion configuration is embedded in the function; no value is
  reproduced here. No application `process.env` dependency is declared.
- Statuses: missing metric 400, send callback failure 500, callback success 200,
  non-POST 405. A successful UDP callback is not remote ingestion acknowledgement.

### Verified by local tests

- The source matches the Phase 1 baseline byte for byte.
- Build output contains the compiled function and Gatsby function manifest entry.
- Test clients do not execute page JavaScript or request this function. No POST
  was sent and no UDP send path was invoked intentionally during validation.

### Verified from accessible Netlify deployment evidence

Both public origins above return GET 405 with:

```json
{"status":"error","message":"Method not allowed"}
```

This matches the handler's non-POST branch and establishes an accessible deployed
API route. It does not identify the exact plugin version/rewrites or prove POST
delivery.

### Unknown / requires manual Netlify dashboard verification

- Essential Gatsby plugin/version, generated function inventory, and API rewrite.
- Deployed Node function runtime, which need not equal the build runtime.
- Outbound UDP restrictions, actual ingestion, monitoring, and timeout behavior.
- Any private deployment environment overrides (record names/scopes, not values).

Netlify documents generated `__api` packaging for Gatsby Functions. This is the
likely integration, not a confirmed site-specific inventory. Do not remove the
Essential Gatsby integration just because DSG demo generation is removed:
the metrics function still requires supported hosting.

To verify metrics later, use an owner-approved non-production destination/series,
inspect request/status behavior and ingestion separately, and do not generate
production counters merely to test routing.

## Routing, headers, SEO, and starter retirement

### Verified from repository code

- Canonical origin remains `https://nightwraithband.com`.
- Legitimate URLs remain `/`, `/bio/`, `/videos/`, `/photos/`, `/press/`,
  `/contact/`; existing custom 404 source is unchanged.
- [src/components/seo.js](../src/components/seo.js) supplies route metadata,
  canonical links, social metadata, and optional JSON-LD.
- Homepage MusicGroup schema is unchanged.
- [gatsby-config.js](../gatsby-config.js) still uses `gatsby-plugin-sitemap`
  and `gatsby-plugin-robots-txt`.
- Sitemap remains `/sitemap/sitemap-index.xml` plus sitemap shards.
- The new non-indexable `/thanks/` is excluded. Removed starter pages no longer
  enter Gatsby's page graph, so no redundant filter or broad redirect is needed.
- Robots still allows crawling and advertises the same sitemap and host.
- No custom hosting redirects or headers are declared in the repository.

### Verified by local tests

- Six legitimate pages and custom 404 retain baseline metadata, structured data,
  embeds, header/navigation, links, main text, and form markup.
- Sitemap contains exactly the six legitimate canonical URLs; no `/thanks/`,
  `/using-typescript`, `/using-dsg`, error page, or API entry.
- Removed starter HTML/page-data artifacts are absent after a cold build.
- Production preview returns custom 404 content for removed and unknown routes.
- Robots output is unchanged.

### Retirement policy

The TypeScript demo and DSG demo have no meaningful replacement. A genuine 404
is appropriate even if indexed: search engines can eventually remove the URLs.
A 410 is also appropriate for deliberate permanent removal, but requires an
explicit verified hosting rule and is not necessary here. Do not redirect either
demo to an unrelated homepage or serve a 200 fallback. Check Search Console for
indexing/backlinks if available; optionally request removal through the owner's
normal SEO workflow. Keep real pages self-canonical and indexable.

After the next deploy, confirm both slash variants of each retired path return
404 (or an explicitly approved future 410) rather than stale cached content.

## Unknown hosting settings checklist

Have the owner inspect, without sharing secret values:

- Repository/production branch, base/package/publish directories, build command.
- Build image, selected Node/npm versions, install command/flags, cache policy.
- Build-plugin inventory and logs, generated API functions, redirect ordering.
- Dashboard-managed redirects/headers, domain aliases, HTTPS/trailing-slash rules.
- Form detection, quotas, submission/spam and notification settings.
- Environment-variable names, scopes and deploy contexts, including any
  `NODE_VERSION`, `NPM_VERSION`, `NPM_FLAGS`, `NETLIFY_SKIP_GATSBY_FUNCTIONS`,
  or `NETLIFY_SKIP_API_FUNCTION` settings.
- Function runtime/limits and deploy-preview indexing controls.

No secret values should be printed or stored in repository documentation.

## Acceptance contracts for a future Gatsby-to-Vite migration

1. Prerender meaningful route-specific HTML for all six legitimate URLs; preserve
   initial titles/descriptions, canonicals, MusicGroup JSON-LD and social metadata.
2. Preserve URL normalization, real 404 behavior, robots/sitemap locations and
   crawlable links. Exclude return/error/API/starter URLs from the sitemap.
3. Keep the form name, POST encoding, fields, honeypot and `/thanks/` behavior;
   include detectable form HTML in the published output, not only client JS.
4. Preserve `/api/sendMetric`, payload/status conventions, current metric names
   and approved ingestion behavior through a native Netlify function/rewrite.
   Never assume Vite serves Gatsby's `src/api` convention.
5. Preserve public embed URLs and ensure navigation does not remount players.
6. Replace Gatsby image transforms/manifest behavior intentionally; do not ship
   full-size photography as an accidental migration shortcut.
7. Verify new build/publish directories and provider plugins against recorded
   dashboard settings before changing them. Do not remove API packaging together
   with now-unused DSG packaging.
8. Repeat local contract comparisons and owner-approved deploy-preview tests.
   Test forms and ingestion as separate integrations, not proxies for build health.

## References

Retrieved October 26, 2026:

- [Netlify Gatsby integration](https://docs.netlify.com/build/frameworks/framework-setup-guides/gatsby/)
- [Netlify dependency/runtime selection](https://docs.netlify.com/build/configure-builds/manage-dependencies/)
- [Netlify Forms setup/detection](https://docs.netlify.com/manage/forms/setup/)
