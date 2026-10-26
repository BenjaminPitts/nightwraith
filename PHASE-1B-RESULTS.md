# Phase 1B Results: Reproducible Local Development

Date: October 26, 2026.

## Summary

Node 22.23.4 and npm 10.9.4 successfully install the existing lockfile and build
Gatsby 4.25.9 on macOS arm64. No framework/dependency upgrade was needed.

A genuine first-run development failure was reproduced and fixed with small npm
lifecycle hooks. All six required routes respond in development and production
preview. Their production metadata, embeds, structured data, and form markup
match an unmodified-baseline build.

## Branch and baseline

- Feature branch: `chore/reproducible-local-development`.
- Starting local development branch: `2026-facelift`.
- Starting commit: `9de93fa84591d3dcd2a3e35d988a7463dd4c5eb5`.
- Remote `main` was verified at that same commit; no remote `2026-facelift` branch
  existed when checked.
- Pull request targets `main`; no direct commit to `main` and no merge.
- Pull request URL: pending creation; this report will be updated after creation.

## Changes made and files modified

| File | Change |
|---|---|
| [package.json](./package.json) | Add `dev`, advisory exact Node/npm engines, and development startup hooks |
| [.nvmrc](./.nvmrc) | Pin Node 22.23.4 |
| [README.md](./README.md) | Replace starter instructions with project-specific setup, troubleshooting, validation limits, and hosting context |
| [.github/workflows/build.yml](./.github/workflows/build.yml) | PR-only Linux install/build check, pinned Node/npm, npm download caching |
| [PHASE-1B-RESULTS.md](./PHASE-1B-RESULTS.md) | Requested independent-review results report |

No dependency declarations or lockfile changes. No `.npmrc` or strict engine
enforcement. No changes to components, styling, images, pages, metadata, form,
metrics function, Gatsby configuration, or production Netlify configuration.
All pre-existing npm scripts are preserved verbatim.

## Runtime and isolation

- macOS, native Apple Silicon (`process.arch` returned `arm64`).
- Official Node **22.23.4** macOS arm64 archive.
- Node archive SHA-256 verified:
  `c9e1dbc748b33ed2d14f42445191ecaf14c56259c7a9a26d0042c49ec2b66428`.
- npm **10.9.4**, installed under isolated session storage.
- Gatsby **4.25.9**, React/React DOM **18.3.1**, unchanged.
- Existing npm lockfile version **3**, unchanged.

Validation ran in a detached Git worktree under session storage, with no inherited
`node_modules`, `.cache`, or `public` at the initial install/build. This preserved
the user's original dependency tree and generated output.

The official Node binary and isolated npm executable were selected through PATH.
The host's global Node/npm were not changed. nvm is not installed on the host;
the documented `nvm install` / `nvm use` steps were not executed here.

## Commands executed and results

The following paths identify the isolated validation environment used. Commands
shown with variables use those variables only as readable aliases for the exact
absolute paths used in the tool transcript.

```sh
ROOT=/Users/benjaminpitts/Desktop/mf-repos/nightwraith
SESSION=/Users/benjaminpitts/.copilot/session-state/08a081a7-d9d0-4f7b-9b61-4058de9a21ea/files
VALIDATION="$SESSION/phase1b-validation"
RUNTIME="$SESSION/phase1b-runtime"
```

### Initial checks and isolation

Executed successfully:

```sh
git status --short
git branch --show-current
git log -1 --format='%h %s'
git remote -v
gh auth status
git ls-remote --heads origin 2026-facelift main
gh api repos/BenjaminPitts/nightwraith --jq '{default_branch,visibility}'
git switch -c chore/reproducible-local-development
git worktree add --detach "$VALIDATION" HEAD
```

The initial worktree was clean. GitHub authentication was available. Remote
default branch is `main`.

### Release availability and isolated toolchain

```sh
curl --fail --silent --show-error https://nodejs.org/dist/v22.23.4/SHASUMS256.txt
curl --fail --silent --show-error https://registry.npmjs.org/npm/10.9.4
curl --fail --silent --show-error \
  https://nodejs.org/dist/v22.23.4/node-v22.23.4-darwin-arm64.tar.gz \
  -o "$RUNTIME/node-v22.23.4-darwin-arm64.tar.gz"
```

Both proposed releases exist. The checksum entry for the arm64 archive matched.
Inside the runtime directory:

```sh
echo 'c9e1dbc748b33ed2d14f42445191ecaf14c56259c7a9a26d0042c49ec2b66428  node-v22.23.4-darwin-arm64.tar.gz' |
  shasum -a 256 -c -
tar -xzf node-v22.23.4-darwin-arm64.tar.gz
export PATH="$RUNTIME/node-v22.23.4-darwin-arm64/bin:$PATH"
npm install --prefix "$RUNTIME/npm-10.9.4" --no-audit --no-fund npm@10.9.4
node "$RUNTIME/npm-10.9.4/node_modules/npm/bin/npm-cli.js" --version
```

Checksum: OK. npm output: `10.9.4`.

### Baseline clean install, first-run failure, and cold build

Inside the clean validation worktree, using the isolated Node:

```sh
node --version
node "$RUNTIME/npm-10.9.4/node_modules/npm/bin/npm-cli.js" ci --no-audit --no-fund
node "$RUNTIME/npm-10.9.4/node_modules/npm/bin/npm-cli.js" run develop
test ! -d .cache && test ! -d public
node "$RUNTIME/npm-10.9.4/node_modules/npm/bin/npm-cli.js" run build
```

Results:

1. Node reported `v22.23.4`.
2. Clean installation succeeded, adding 1,427 packages in about 11 seconds.
   No force/legacy-peer flags were used. This first pass skipped npm audit;
   a subsequent plain `npm ci` included it.
3. Development failed with exit 1:

   ```text
   UNHANDLED REJECTION ENOENT: no such file or directory, lstat '.../.cache'
   ```

   Stack: `tmp/lib/tmp.js` `_getTmpDirSync` -> `tmpNameSync` ->
   Gatsby `ControllableScript.start`.
4. The `.cache` and `public` directories were confirmed absent before the build.
5. Cold production build passed in approximately 37.34 seconds, including
   90/90 Sharp image-processing jobs.

Root cause: Gatsby 4 calls `tmpNameSync({ tmpdir: <project>/.cache })` before
creating `.cache`; locked `tmp` 0.2.7 resolves that directory with
`fs.realpathSync`, which fails when it is absent. This is a startup-directory
assumption, not evidence that Node 22 cannot build Gatsby.

Fix: `predev`, `predevelop`, and `prestart` use the Node filesystem API to create
`.cache` recursively. They do not clear existing cache, suppress errors, patch
dependencies, or alter application behavior. Covering all three entry points
preserves equivalent behavior after clone or `npm run clean`.

### Final exact workflow

Baseline production HTML contracts were saved outside the repository. The final
manifest and Node pin were copied into the isolated checkout. Then:

```sh
export PATH="$RUNTIME/npm-10.9.4/node_modules/.bin:$RUNTIME/node-v22.23.4-darwin-arm64/bin:$PATH"
node --version
npm --version
npm ci
npm run clean
test ! -d .cache
npm run dev
```

- Plain `npm ci`: passed, adding 1,427 packages and auditing 1,428 packages in
  approximately 51 seconds.
- `npm run clean`: passed.
- `.cache` absent before `predev`: confirmed.
- `predev`: created `.cache`.
- `npm run dev`: compiled successfully and served `http://localhost:8000/`.
- Python `urllib.request.urlopen` checks verified HTTP 200 and HTML for all six
  required routes. Their Gatsby page-data JSON also returned the expected route
  and component chunk name, without query errors.
- Development server was stopped before the production build.

Then:

```sh
npm run clean
test ! -d .cache && test ! -d public
npm run build
npm run serve
```

- Final cold build: passed in approximately 36.29 seconds, with 90/90 Sharp jobs.
- Production preview: responsive at `http://localhost:9000/`.
- Six route checks: HTTP 200.
- Preview server stopped after checks.

### Route and output preservation

| Route | Development HTTP/page data | Production preview | Baseline HTML contract |
|---|---|---|---|
| `/` | Pass | 200 | Identical |
| `/bio/` | Pass | 200 | Identical |
| `/videos/` | Pass | 200 | Identical |
| `/photos/` | Pass | 200 | Identical |
| `/press/` | Pass | 200 | Identical |
| `/contact/` | Pass | 200 | Identical |

A Python HTML parser compared the final preview against the unmodified baseline
build under the same runtime. It compared titles, descriptions, robots metadata,
Open Graph/Twitter metadata, canonical links, JSON-LD script content, iframe
attributes, and form/input/textarea attributes. All six contracts matched.
This is not a screenshot or audible-playback test.

### Additional consistency checks

```sh
node -p 'process.arch'
git diff --check
git diff --exit-code -- package-lock.json src gatsby-config.js gatsby-node.js gatsby-browser.js gatsby-ssr.js
git status --short
```

Passed: native arm64; no whitespace errors; no changes to application source,
Gatsby configuration, or lockfile.

Node assertions verified:

- Dependencies/devDependencies unchanged from baseline.
- Every pre-existing script unchanged.
- `dev` exactly equals `gatsby develop`.
- Node engine equals `.nvmrc`.
- Manifest dependency declarations match existing lockfile root declarations.

The existing installed `js-yaml` parser validated workflow syntax and assertions
verified a PR-only trigger, Node-version-file selection, `npm ci`, and
`npm run build`. No tooling dependency was added.

## Known warnings

1. npm emits `ERESOLVE overriding peer dependency` for Gatsby's experimental
   `react-server-dom-webpack`, which expects an exact experimental React version
   rather than stable React 18.3.1. Installation still passes without force or
   legacy-peer flags. The invalid peer remains unresolved.
2. npm reports deprecated transitive packages, including old Babel proposal
   plugins, `string-similarity`, `inflight`, `async-cache`, `stable`, ESLint 7,
   `babel-eslint`, `express-graphql`, `glob`, and old `rimraf`.
3. Plain `npm ci` reported **82 vulnerabilities: 5 low, 23 moderate, 52 high,
   2 critical**. These are npm's audit counts at validation time, not an
   independently verified production exploitability assessment. No audit fix
   command was run and no dependency changes were made.
4. Gatsby emits the existing Babel `isModuleDeclaration` deprecation from
   `babel-plugin-lodash` during development and build.
5. The existing `npm test` placeholder still exits with failure by design. It was
   not used as a validation gate in this phase.

## Limits, blocked tasks, and operational notes

- No local install/build blocker remains on the validated macOS arm64 runtime.
- The new GitHub Actions workflow runs on Ubuntu; remote Linux execution must be
  checked separately and is not inferred from macOS success.
- nvm commands, global npm selection, Intel macOS, and Rosetta were not tested.
- Native-module recovery guidance was not validated by deliberately breaking
  native dependencies.
- No browser playback, visual redesign, form submission, or production
  deployment test was performed.
- Known `/thanks/` and starter DSG route problems remain untouched.
- Existing metrics effects and function behavior remain untouched. Local Gatsby
  can execute real metrics requests. `gatsby serve` logged executions of
  `/api/sendMetric` during preview, so it must not be described as incapable of
  running Gatsby Functions. No intentional metric POST was issued by the audit
  route-check scripts.
- No Netlify dashboard settings were accessed or changed.
- `.nvmrc` and package engines express the development runtime; no production
  Netlify runtime was explicitly configured. Because hosting build systems can
  discover repository runtime pins, confirm the deploy preview's selected Node
  version before release rather than assuming these pins are invisible to it.

## Recommendations for the next step

1. Review and merge only after the PR build succeeds; do not merge automatically.
2. Independently address the npm advisory graph and experimental peer in a
   separately approved dependency-maintenance change.
3. Inventory/version Netlify's actual build/runtime/plugin contracts before a
   framework migration.
4. Fix the existing form confirmation and sitemap starter-route issues in their
   own scoped PRs.
