# Phase 2 Results: Hosting Contracts and Site Cleanup

Date: October 26, 2026.

## 1. Summary

Implemented locally on the existing `2026-facelift` branch, based on Phase 1
commit `2d046a1`. The initial working tree was clean. All changes remain
uncommitted and unstaged.

- Added [Netlify hosting contracts](./docs/NETLIFY-CONTRACTS.md) with separate
  source, local-test, public-deployment, and unknown/dashboard evidence.
- Added `/thanks/` as a noindex contact-form return page using existing layout
  and styles, with conditional confirmation rather than an unverified claim of
  successful delivery.
- Removed the TypeScript and DSG starter pages and the DSG-only page-generation
  configuration.
- Kept exactly the six legitimate URLs in the generated sitemap.
- Preserved existing page content, navigation, SEO, embeds, custom 404, form
  declaration, and metrics implementation.
- Made only related README structure/hosting-note changes.
- Added no dependencies or speculative Netlify configuration.

## 2. Exact files changed

| File | Operation | Purpose |
|---|---|---|
| [README.md](./README.md) | Modified | Update removed structure entries and link contracts/return-route notes; setup commands unchanged |
| [gatsby-config.js](./gatsby-config.js) | Modified | Explicitly exclude `/thanks/` from existing sitemap plugin |
| `gatsby-node.js` | Deleted | Its only export registered the unwanted DSG demo |
| `src/pages/using-typescript.tsx` | Deleted | Remove unused indexable starter page |
| `src/templates/using-dsg.js` | Deleted | Remove unused DSG template |
| [src/pages/thanks.js](./src/pages/thanks.js) | Added | Existing-layout, noindex return destination |
| [docs/NETLIFY-CONTRACTS.md](./docs/NETLIFY-CONTRACTS.md) | Added | Hosting/integration contracts and manual acceptance tests |
| [PHASE-2-RESULTS.md](./PHASE-2-RESULTS.md) | Added | Requested local independent-review report |

No changes to package manifests/lockfile, runtime pin, workflow, existing page
components, shared components, CSS, images, metrics function, SEO helper,
canonical domain, robots policy, or production Netlify settings.

Deleted files are listed as paths rather than links because they no longer exist.

## 3. Netlify contracts discovered

See the contracts document for full evidence categories and reference sources.

### Verified from repository code

- `npm run build` runs `gatsby build`; publish artifacts go to `public/`.
- `npm run serve` runs `gatsby serve`; Gatsby can serve its Functions locally.
- `.nvmrc` pins Node 22.23.4; advisory engines specify npm 10.9.4.
- Existing GitHub CI explicitly chooses npm 10.9.4; that is not proof of Netlify's
  selected npm/install command.
- No committed `netlify.toml`, `_redirects`, `_headers`, Netlify function
  directory, explicit Netlify build-plugin declaration, or Gatsby redirect API.
- Application source has no `process.env` reads. Private hosting settings may
  still exist. No secret values were printed or recorded.
- The form is static-detectable native POST with unchanged detection/honeypot.
- `/api/sendMetric` is a Gatsby Function with JSON input and UDP StatsD output.
- Sitemap/robots use the existing plugins and production canonical origin.

### Runtime detection implications

Official Netlify documentation says a base-directory `.nvmrc` can override the
dashboard Node version. It is not necessarily a local-only development file.
Check the effective base, overrides, and build log before assuming the hosted
runtime matches the local pin.

The official Node 22.23.4 archive fetched here bundled npm 10.9.9. The tests
explicitly selected an isolated npm 10.9.4. Netlify's effective npm version
requires log/dashboard confirmation; an advisory engine does not guarantee it.

### Verified from accessible deployment evidence

Public GET-only checks against production and historical Phase 1 preview:

| Origin | Contact | Thanks | Metrics GET |
|---|---|---|---|
| `https://nightwraithband.com` | 200 | 404 | 405 JSON |
| `https://deploy-preview-7--sprightly-biscochitos-f0b9dc.netlify.app` | 200 | 404 | 405 JSON |

Both report `Server: Netlify`. Deployed form markup is consistent with Netlify
processing (detection attribute stripped, hidden fields retained), but neither
form acceptance nor notifications were tested. Metrics GET returns the expected
method-not-allowed JSON without entering the UDP send path.

These are already-deployed versions, not the uncommitted Phase 2 implementation.
No new deployment was triggered.

### Unknown / requires manual dashboard verification

Actual build/base/publish settings, Node/npm selection and install command,
build-plugin inventory, API rewrites/function runtime, dashboard headers and
redirects, environment names/scopes, form detection/quotas/notifications, and
actual metrics ingestion remain unknown.

The Essential Gatsby plugin's documented `__api` packaging is a likely explanation
for the deployed API route, not a confirmed plugin/version inventory.

No `netlify.toml` was added because dashboard conflicts cannot be ruled out.
Removing the DSG demo does not justify removing Gatsby API hosting support.

## 4. Contact-form findings and return-page behavior

The form source was inspected before editing. It already specifies:

```text
name=contact
method=post
action=/thanks/
data-netlify=true
netlify-honeypot=bot-field
hidden fields: bot-field, form-name=contact
user fields: name, email, message
```

The misspelled extra `netifly` attribute is not relied on for detection and was
left untouched. No demonstrated submission-handler change was required.

The missing page was the demonstrated route issue: existing public production
and preview both return 404 for `/thanks/`.

The new return page:

- Uses the existing Layout, SEO helper, and styles.
- Uses the title `Contact form confirmation | NightWraith`.
- Sets canonical `https://nightwraithband.com/thanks/`.
- Sets `noindex, nofollow`; excluded from sitemap.
- Includes homepage and contact links.
- Thanks the user conditionally if redirected after a successful submission.
- Explicitly says it cannot verify delivery and direct visits do not send a
  message.

A static GET cannot distinguish an accepted Netlify POST redirect from a direct
visit reliably. A referrer/query flag would not prove success. Conditional
wording satisfies the no-false-confirmation requirement without broadening this
phase into a form-handler rewrite.

**A working return page is not evidence that Netlify accepted a message.**

## 5. Starter-route and sitemap cleanup

- Removed both starter source files rather than merely hiding sitemap entries.
- Deleted `gatsby-node.js` because its sole purpose was registering `/using-dsg`.
- No unrelated exports or application routes were removed.
- After a cold build, no starter HTML or page-data directories remain.
- `/using-typescript/` and `/using-dsg/` return custom HTTP 404 in local preview.
- An arbitrary missing URL also returns custom HTTP 404.
- No redirects were added. Genuine 404 is appropriate for indexed demos without
  a meaningful replacement. A deliberate future 410 is optional and requires a
  verified hosting rule, not a redirect to unrelated content.

Generated sitemap contains exactly:

```text
https://nightwraithband.com/
https://nightwraithband.com/bio/
https://nightwraithband.com/videos/
https://nightwraithband.com/photos/
https://nightwraithband.com/press/
https://nightwraithband.com/contact/
```

Neither starter URL, `/thanks/`, custom error URL, nor API URL appears.
Robots output matches baseline, including its existing sitemap and host.

Exact generated HTML file inventory:

```text
index.html
bio/index.html
videos/index.html
photos/index.html
press/index.html
contact/index.html
thanks/index.html
404/index.html
404.html
```

## 6. Commands executed and test results

### Isolation and runtime

The host shell used Node 20.20.2/npm 10.8.2, and the user's Gatsby process
(PID 33206) was already listening on port 8000. Two clarification forms returned
no explicit selection, so no permission to stop it was assumed.

Instead, local builds used a disposable filesystem snapshot of the local source
and installed dependencies. All implementation edits were made in the existing
`2026-facelift` working tree. No Git worktree or branch was created or switched.

Node source comparisons verified all 62 final source files plus Gatsby config
matched the tested snapshot byte for byte.

The following readable variables represent the exact paths used:

```sh
ROOT=/Users/benjaminpitts/Desktop/mf-repos/nightwraith
SESSION=/Users/benjaminpitts/.copilot/session-state/08a081a7-d9d0-4f7b-9b61-4058de9a21ea/files
RUNTIME="$SESSION/phase2-runtime"
VALIDATION="$SESSION/phase2-validation"
```

Read-only inspection:

```sh
git branch --show-current
git status --short
git log -3 --oneline
git ls-files
git diff --stat
node --version
npm --version
lsof -nP -iTCP:8000 -sTCP:LISTEN
lsof -nP -iTCP:9000 -sTCP:LISTEN
```

Prepared a temporary official runtime outside the repository:

```sh
curl --fail --silent --show-error \
  https://nodejs.org/dist/v22.23.4/node-v22.23.4-darwin-arm64.tar.gz \
  -o "$RUNTIME/node-v22.23.4-darwin-arm64.tar.gz"
```

From that runtime directory:

```sh
echo 'c9e1dbc748b33ed2d14f42445191ecaf14c56259c7a9a26d0042c49ec2b66428  node-v22.23.4-darwin-arm64.tar.gz' |
  shasum -a 256 -c -
tar -xzf node-v22.23.4-darwin-arm64.tar.gz
export PATH="$RUNTIME/node-v22.23.4-darwin-arm64/bin:$PATH"
npm install --prefix "$RUNTIME/npm-10.9.4" --no-audit --no-fund npm@10.9.4
```

Checksum: OK. Installing npm itself was isolated tooling selection, not project
dependency installation. Package files were not changed.

Baseline snapshot setup:

```sh
mkdir -p "$VALIDATION"
git archive HEAD | tar -xf - -C "$VALIDATION"
cp -cR node_modules "$VALIDATION/node_modules"
export PATH="$RUNTIME/npm-10.9.4/node_modules/.bin:$RUNTIME/node-v22.23.4-darwin-arm64/bin:$PATH"
cd "$VALIDATION"
node --version
npm --version
set -o pipefail
npm run clean
npm run build 2>&1 | tee "$SESSION/phase2-baseline-build.log"
python3 "$SESSION/phase2-checks.py" baseline
```

- Node: **22.23.4**, npm: **10.9.4**, macOS arm64.
- Baseline cold build: passed, approximately **37.86 seconds**.
- Sharp image jobs: **90/90**.
- Saved six route contracts plus custom 404, robots, and metrics source digest.

After working-tree implementation edits, the new page was formatted using the
existing tool:

```sh
node node_modules/prettier/bin-prettier.js --write src/pages/thanks.js
```

The changed config/page were copied into the disposable snapshot, and only its
three corresponding retired source files were removed. Final build/checks:

```sh
cd "$VALIDATION"
npm run clean
npm run build 2>&1 | tee "$SESSION/phase2-final-build.log"
python3 "$SESSION/phase2-checks.py" check
npm run serve -- --host 127.0.0.1 --port 9012
```

From a separate tool session:

```sh
python3 "$SESSION/phase2-checks.py" http http://127.0.0.1:9012
```

- Final cold build: passed, approximately **28.98 seconds**, Sharp **90/90**.
- Port 9012 chosen to avoid the user's existing server and unintended browser
  connections to a familiar preview port.
- Standard-library HTTP GETs only; scripts/iframes were not executed.
- Test preview stopped afterward. User's port-8000 process left running.

### Verification results

| Check | Result |
|---|---|
| Six legitimate routes, initial HTML | HTTP 200; passed |
| `/thanks/` | HTTP 200, correct content, noindex/canonical and links |
| Removed starter routes | HTTP 404 with custom error content |
| Unknown route | HTTP 404 with custom error content |
| Existing custom 404 documents | Generated; explicit `/404/` returns 200 as before |
| Titles, meta tags, canonicals, JSON-LD | Match baseline on all existing routes |
| Iframes/embedded media attributes | Match baseline |
| Header/navigation, main text and links | Match baseline |
| Contact detection/method/action/fields | Match baseline, including honeypot |
| Robots | Byte-identical to baseline |
| Sitemap | Exactly six legitimate canonical URLs |
| Starter HTML/page-data artifacts | Absent |
| Metrics source | SHA-256 identical; compiled function and manifest present |
| Unexpected HTML pages | None |
| New-page Prettier check | Passed |
| Diff whitespace check | Passed |
| Protected source/config/dependency diff | Empty |
| Staged diff | Empty |

Additional executed commands:

```sh
node node_modules/prettier/bin-prettier.js --check src/pages/thanks.js
git diff --check
git diff --exit-code -- src/api src/components src/pages/index.js \
  src/pages/bio.js src/pages/contact.js src/pages/photos.js src/pages/videos.js \
  src/pages/press.js src/pages/404.js package.json package-lock.json .nvmrc \
  .github/workflows/build.yml
git diff --cached --exit-code
```

Output comparisons used a temporary Python standard-library HTML parser:
meta/title/canonical/JSON-LD, iframe/form attributes, header elements, main text
and links were compared, not webpack hash/script filenames. Sitemap XML was
parsed, not checked only with substring searches.

## 7. Failed, corrected, or skipped checks

- No application build or route check failed.
- One test-harness inventory assertion initially included a directory named
  `page-data/404.html` as though it were an HTML file. Adding an `is_file()` filter
  corrected that check; the exact file inventory then passed.
- An initial warning-log matcher did not account for terminal ANSI sequences.
  After normalization, both logs contained exactly the same nonempty Babel
  warning list. The correction avoids a false claim of zero warnings.
- `.cache/pages.json` was an empty array after preview startup; it was not used
  as proof of route removal. Actual generated HTML/page-data, sitemap, build
  listing and HTTP responses were used instead.
- No fresh project install or audit was run; dependencies/manifests are unchanged.
  This phase does not revalidate the earlier npm advisory count.
- Existing `npm test` is a known failing starter placeholder; not run.
- No browser playback, visual/screen-reader test, form POST, production telemetry,
  Netlify CLI build, dashboard inspection, or new deployment performed.
- Both retired URLs' slashless variants still need hosted verification; local
  HTTP checks exercised their canonical slash forms.

## 8. Outstanding manual Netlify verification

The exact owner-run form test is in the contracts document:

1. Deploy reviewed changes via the owner's normal process.
2. Verify effective runtime/build settings and form detection for the preview.
3. Check direct `/thanks/` does not claim delivery.
4. Submit one approved, uniquely marked preview message with blank honeypot.
5. Inspect the native POST/payload and resulting response/redirect chain.
6. Confirm the marker appears under `contact` in Netlify Forms, with expected
   spam status; separately verify configured notifications.
7. Test a failed/offline submission without reporting success.

Also verify retired routes and slash variants return real 404s after deployment,
legitimate URLs/canonicals and sitemap are intact, API hosting remains installed,
and any metrics-ingestion test uses an approved non-production target.

No automated local check substitutes for form receipt or UDP ingestion.

## 9. Risks and unresolved issues

- Existing dependency peer/deprecation/advisory concerns remain outside scope.
  Both builds emitted the same existing `isModuleDeclaration` deprecation from
  `babel-plugin-lodash`; no additional build warning appeared.
- The `.nvmrc` pin may influence Netlify build Node; actual selected Node/npm and
  function runtime must be checked, not assumed.
- Public GET evidence cannot reveal private dashboard rules or form delivery.
- Conditional return-page wording is intentional: a direct static visit cannot
  verify a completed submission.
- Existing source-side metrics ingestion configuration is unchanged and not
  reproduced in documentation. UDP send callback success is not ingestion proof.
- The user's running server uses the host's Node 20, while this phase's tests
  explicitly used the pinned Node 22. Restart normal development under the
  project's documented pinned runtime when convenient.
- Existing source/cache hot reload may reflect edited files, but no cache clean
  or dependency replacement was performed in the user's working tree.

## 10. Recommended next phase

Review these local changes and complete owner-run Netlify preview checks.
Then extract reusable page content/sections without redesign or framework
migration, using these generated HTML, form, API, and route contracts as the
regression baseline.

Do not begin migration until the actual hosting settings and manual integration
results are recorded. No extra Git automation is needed.

## Git handling

No branch change/creation, staging, commit, push, merge, cherry-pick, reset,
stash, PR action, or remote settings change was performed. Read-only Git commands
and `git archive` were used only for inspection/baseline export.

The report is intentionally local and unstaged. The owner decides whether to
include it in the repository.
