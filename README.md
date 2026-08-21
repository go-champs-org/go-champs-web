# Go Champs Front-End ![build status](https://github.com/lairjr/go-champs-web/actions/workflows/master-ci.yml/badge.svg)

*This is the Go Champs Front-End repository.*

Go Champs is a comprehensive tournament management platform. This repository is a **pnpm/Turborepo monorepo** containing two Next.js/React applications that share a common API backend:

* **`apps/cms`** — the Content Management System used by tournament organizers to create and manage tournaments, teams, players, games and statistics. Built with Create React App (via [craco](https://craco.js.org/)) + Redux. Runs on **port 3000**.
* **`apps/public`** — the public-facing site fans and participants use to discover tournaments, follow live games, and check standings/statistics. Built with **Next.js (App Router)**, TypeScript, `next-intl` (English/Portuguese) and Tailwind CSS. Runs on **port 3001**.

Shared code lives under `packages/`:

* **`packages/domain-types`** — shared TypeScript domain types.
* **`packages/api-client`** — shared HTTP client for the Go Champs API.
* **`packages/ui`** — shared React UI components/theme used by `apps/public`.

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

## Getting Started

### Prerequisites
- Node.js `>=20.9.0` (see `engines` in `package.json`; `apps/public` requires it for Next.js 16)
- pnpm package manager (`pnpm@9.15.0`, see `packageManager` in `package.json`) — enable it with `corepack enable && corepack prepare pnpm@9.15.0 --activate`

### Local Development

#### Option 1: Dev Container (Recommended)
This project includes a `.devcontainer` configuration for a consistent development environment (Node, pnpm and all Cypress/X11 system dependencies preinstalled):

1. **Using VS Code**:
   - Install the "Dev Containers" extension
   - Open the project in VS Code
   - Click "Reopen in Container" when prompted
   - Dependencies are installed automatically (`pnpm install`)

2. **Using GitHub Codespaces**:
   - Open the repository in GitHub
   - Click "Code" → "Codespaces" → "Create codespace"
   - The environment is set up automatically

3. **Using Docker Compose directly**:
   ```bash
   docker compose -f .devcontainer/docker-compose.yml up -d
   docker compose -f .devcontainer/docker-compose.yml exec app pnpm install
   ```
   Then run any command below prefixed with `docker compose -f .devcontainer/docker-compose.yml exec app`. See [AGENTS.md](AGENTS.md) for the full command reference.

#### Option 2: Local Setup
If you prefer to run locally outside a container:

1. Clone the repository
2. Install dependencies: `pnpm install`
3. Configure environment variables (see below) — required for `apps/cms`, optional for `apps/public`
4. Start the development server(s): `pnpm dev` (runs every app in parallel via Turborepo), or start a single app (see [Available Scripts](#available-scripts))
5. Run tests: `pnpm test`

### Environment Variables

Both apps talk to the Go Champs API backend. Configuration is passed via env files (never committed — they're gitignored).

#### `apps/cms`

Create `apps/cms/env.local.js` (used by the `start`/`dev` scripts via [`env-cmd`](https://www.npmjs.com/package/env-cmd); see `env.staging.js`/`env.prod.js` for the shape used in CI):

```js
module.exports = {
  CI: false,
  REACT_APP_API_HOST: 'http://localhost:4000', // point at your local/staging Go Champs API
  REACT_APP_AMPLITUDE_API_KEY: '',
  REACT_APP_EMAILJS_PUBLIC_KEY: '',
  REACT_APP_EMAILJS_TEMPLATE_ID: '',
  REACT_APP_FACEBOOK_APP_ID: '',
  REACT_APP_GA_ID: '',
  REACT_APP_RECAPTCHA_SITE_KEY: '',
  REACT_APP_SCOREBOARD_APP_URL: '',
  REACT_APP_ENV: 'local'
};
```

Only `REACT_APP_API_HOST` is required to get the app talking to an API; the rest are optional integrations (Amplitude analytics, EmailJS, Facebook login, Google Analytics, reCAPTCHA, scoreboard companion app) and can be left blank locally.

#### `apps/public`

Create `apps/public/.env.local` (standard Next.js env file, already gitignored):

```
NEXT_PUBLIC_CMS_URL=http://localhost:3000
NEXT_PUBLIC_SITE_URL=http://localhost:3001
NEXT_PUBLIC_AMPLITUDE_API_KEY=
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
```

`apps/public` reads the API host from `packages/api-client`'s own configuration; without it, page loaders fall back to empty lists (the same path a failing API takes in production), so the app still builds and runs without any env file — set `NEXT_PUBLIC_CMS_URL` mainly so links back into the CMS resolve correctly locally.

## Available Scripts

This repository is a pnpm/Turborepo monorepo. Commands run from the repo root affect all apps and packages (via Turborepo); use `--filter <package-name>` to target a single one, or `cd` into its directory and drop the filter.

Root-level (all apps/packages, via Turborepo):
  * `pnpm dev` - Start every app's dev server in parallel
  * `pnpm build` - Build all apps for production
  * `pnpm start` - Start every app's production server
  * `pnpm test` - Run the test suite for all apps/packages
  * `pnpm test:ci` - Run the test suite for all apps/packages in CI mode
  * `pnpm lint:check` - Check code linting for all apps

CMS app (`apps/cms`, package `@gochamps/cms`):
  * `pnpm --filter @gochamps/cms dev` - Start the development server on `http://localhost:3000`
  * `pnpm --filter @gochamps/cms build` - Build the app for production
  * `pnpm --filter @gochamps/cms build:staging` - Build using staging environment config
  * `pnpm --filter @gochamps/cms test` - Run the unit test suite (watch mode)
  * `pnpm --filter @gochamps/cms test:ci` - Run the unit test suite once, non-interactively
  * `pnpm --filter @gochamps/cms test:e2e` - Run Cypress end-to-end tests
  * `pnpm --filter @gochamps/cms test:e2e:headless` - Run Cypress e2e tests headless via Xvfb (see [CYPRESS_DEVCONTAINER.md](CYPRESS_DEVCONTAINER.md))
  * `pnpm --filter @gochamps/cms lint` - Fix code linting
  * `pnpm --filter @gochamps/cms lint:check` - Check code linting

Public app (`apps/public`, package `@gochamps/public`):
  * `pnpm --filter @gochamps/public dev` - Start the development server on `http://localhost:3001`
  * `pnpm --filter @gochamps/public build` - Build the app for production
  * `pnpm --filter @gochamps/public start` - Start the production server (after `build`)
  * `pnpm --filter @gochamps/public test` - Run the Jest unit test suite
  * `pnpm --filter @gochamps/public test:ci` - Run the Jest unit test suite in CI mode
  * `pnpm --filter @gochamps/public lint:check` - Check code linting (Biome)

Shared packages (`packages/api-client`, `packages/domain-types`, `packages/ui`):
  * `pnpm --filter @gochamps/api-client test` / `test:ci` - Run the API client's unit tests
  * `pnpm --filter @gochamps/ui test` / `test:ci` - Run the shared UI package's unit tests

## Testing

* Unit tests use Jest and run per-app/package as described above.
* End-to-end tests (Cypress) cover `apps/cms` only — see [CYPRESS_DEVCONTAINER.md](CYPRESS_DEVCONTAINER.md) for running them locally and in the devcontainer.
* See [TESTING.md](TESTING.md) for testing conventions and guidelines.

## Documentation

  * See [OVERVIEW.md](OVERVIEW.md) for application purpose and features
  * See [ARCHITECTURE.md](ARCHITECTURE.md) for application architecture
  * See [IMPLEMENTATION.md](IMPLEMENTATION.md) for implementation guidelines
  * See [TESTING.md](TESTING.md) for testing guidelines
  * See [CYPRESS_DEVCONTAINER.md](CYPRESS_DEVCONTAINER.md) for running Cypress e2e tests locally/in the devcontainer
  * See [AGENTS.md](AGENTS.md) for running commands inside the devcontainer (used by AI coding agents and as a Docker Compose reference)

---

## License

- **[MIT license](https://github.com/lairjr/go-champs-web/blob/master/LICENSE)**
- Copyright 2019.
