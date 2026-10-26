# NightWraith

The official NightWraith band website: <https://nightwraithband.com/>.
Built with Gatsby 4 and React 18, and hosted on Netlify.

## Prerequisites

- Git.
- [nvm](https://github.com/nvm-sh/nvm) to select the project Node version.
- **Node.js 22.23.4** (pinned in [.nvmrc](./.nvmrc)).
- **npm 10.9.4**, the version used for validation and CI.

Node and npm versions in [package.json](./package.json) are advisory; strict
engine enforcement is not enabled. A global Gatsby CLI is not required.

## Getting started

```sh
git clone https://github.com/BenjaminPitts/nightwraith.git
cd nightwraith
nvm install
nvm use
node --version
npm --version
```

If npm is not 10.9.4, select it once while the project Node version is active:

```sh
npm install --global npm@10.9.4
```

Then the normal development workflow is:

```sh
nvm install
nvm use
npm ci
npm run dev
```

Open <http://localhost:8000/>. Stop the server with Ctrl+C.
`npm run develop` and `npm start` remain available as equivalent entry points.

Use `npm ci` to install the committed lockfile. Do not use `--force` or
`--legacy-peer-deps` to suppress dependency conflicts.

## Production build and local preview

Stop the development server before switching to a production build.

```sh
npm run build
npm run serve
```

The static preview is available at <http://localhost:9000/>.
For a cold-cache build:

```sh
npm run clean
npm run build
```

`gatsby serve` previews production output and, in this Gatsby version, can also
execute Gatsby Functions locally. It does not reproduce Netlify Forms, deployed
Netlify rewrites, or the hosted function runtime.

## Troubleshooting

### Gatsby cache and first startup

The locked Gatsby 4 / `tmp` combination requires `.cache` to exist before
development startup. The `predev`, `predevelop`, and `prestart` npm hooks create
that directory without clearing it. Use the npm scripts rather than invoking
`gatsby develop` directly.

For stale cache or generated output, stop Gatsby first, then run:

```sh
npm run clean
npm run dev
```

Cleaning is a recovery step, not required on every startup.

### Sharp and other native dependencies

If Sharp, LMDB, or filesystem watchers fail to load after changing Node versions
or CPU architecture, stop Gatsby and reinstall under the pinned runtime:

```sh
nvm use
npm ci
npm run clean
npm run dev
```

`npm ci` replaces the local dependency tree; do not copy `node_modules` between
machines or architectures. The recovery sequence is guidance, not a reproduced
native-module repair. If installation still fails, retain the exact error and
check network access to package/native-binary downloads before changing packages.
Do not downgrade dependencies or force installation as a workaround.

### Apple Silicon

Validation used native macOS arm64. Check the active Node architecture:

```sh
node -p "process.arch"
```

It should print `arm64` on an Apple Silicon Mac using native Node. Avoid mixing a
Rosetta/x64 terminal installation with arm64 dependencies. Intel macOS and
Rosetta operation have not been validated in this phase.

### Known warnings

- npm warns about Gatsby's experimental `react-server-dom-webpack` React peer.
  A clean installation succeeds without force/legacy-peer flags, but
  `npm ls react` can still report this pre-existing invalid peer.
- Several Gatsby-owned transitive packages are deprecated, including old Babel
  proposal plugins, ESLint tooling, `glob`, and `rimraf`.
- Gatsby's build reports a deprecated Babel `isModuleDeclaration` call from
  `babel-plugin-lodash`.
- The validation-time `npm ci` audit reported 82 advisories (5 low, 23 moderate,
  52 high, 2 critical). These are npm's dependency-graph results, not a confirmed
  assessment of exploitable production issues. No audit fixes were applied.
- `npm test` is still a starter placeholder that intentionally exits with an
  error; it is not a test suite.

These warnings are not fixed by this development-only change. Dependency and
framework upgrades require a separate review.

## Repository structure

- [src/pages/](./src/pages/): homepage, Bio, Videos, Photos, Press, Contact, contact
  form return page, and custom error page.
- [src/components/](./src/components/): shared layout, header, SEO, form, and CSS.
- [src/images/](./src/images/): photography, artwork, logo, and social icons.
- [src/api/](./src/api/): Gatsby metrics function.
- [gatsby-config.js](./gatsby-config.js): metadata, image, sitemap, and robots
  plugins.
- [public/](./public/): generated production output, ignored by Git.
- [.cache/](./.cache/): Gatsby cache, ignored by Git.
- [.github/workflows/](./.github/workflows/): pull-request install/build check.

## Netlify and integration testing

The production site is hosted on Netlify. Gatsby outputs static files to
`public`; the expected build command is `npm run build`. Actual dashboard build
settings, plugins, runtime versions, and environment variables must be confirmed
with the site owner. This change does not alter production Netlify configuration.

No production credentials are required to render the local pages. Public
Spotify/Bandcamp embeds require network access. Existing page effects call the
metrics function, which can send real Hosted Graphite metrics during local
development; this phase does not change that behavior.

Gatsby development serves Gatsby Functions, including `/api/sendMetric`.
Netlify CLI is optional for ordinary frontend development. Netlify Dev is useful
for Netlify rewrites, environment contexts, and generated functions; for Gatsby
function packaging, Netlify documents running `netlify build` before testing the
generated functions with `netlify dev`. That workflow was not validated here.

Verify actual form detection, receipt, notifications, and deployed function
behavior on an approved Netlify deploy preview. A local Gatsby server does not
prove Netlify Forms works. The form returns to `/thanks/`, a noindex page that
does not independently verify delivery or treat a direct visit as a submission.

See [Netlify hosting contracts](./docs/NETLIFY-CONTRACTS.md) for verified source
behavior, public deployment evidence, unknown dashboard settings, and the exact
manual form/hosting checks required before a migration.

## Validation scope

Phase 1B validation targets Node 22.23.4 and npm 10.9.4 on macOS arm64:
clean installation, cold-cache production build, development startup, and HTTP
checks for `/`, `/bio/`, `/videos/`, `/photos/`, `/press/`, and `/contact/`.
See the Phase 1B results report and pull request for executed commands and results.

nvm installation/version selection and the global npm-selection command are
documented setup guidance; validation used an isolated official Node binary and
an isolated npm installation instead of changing the machine's global runtime.
Browser playback, form submission, and Netlify integration tests are not covered.
