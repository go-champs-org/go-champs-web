# Go Champs Front-End ![build status](https://github.com/lairjr/go-champs-web/actions/workflows/master-ci.yml/badge.svg)

*This is the Go Champs Front-End repository.*

Go Champs is a comprehensive tournament management platform that serves as both a CMS for tournament organizers and a public viewing experience for fans and participants.

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

## Getting Started

### Prerequisites
- Node.js (recommended version specified in `.nvmrc`)
- pnpm package manager (`pnpm@9.15.0`, see `packageManager` in `package.json`)

### Local Development

#### Option 1: Dev Container (Recommended)
This project includes a `.devcontainer` configuration for consistent development environments:

1. **Using VS Code**:
   - Install the "Dev Containers" extension
   - Open the project in VS Code
   - Click "Reopen in Container" when prompted
   - All dependencies will be automatically installed

2. **Using GitHub Codespaces**:
   - Open the repository in GitHub
   - Click "Code" → "Codespaces" → "Create codespace"
   - The environment will be set up automatically

#### Option 2: Local Setup
If you prefer to run locally outside a container:

1. Clone the repository
2. Install dependencies: `pnpm install`
3. Start the development server: `pnpm start`
4. Run tests: `pnpm test`

### Available Scripts

This repository is a pnpm/Turborepo monorepo. Commands run from the repo root affect all apps (via Turborepo); use `--filter @gochamps/cms` to target the CMS app specifically, or `cd apps/cms` and drop the filter.

Root-level (all apps, via Turborepo):
  * `pnpm build` - Build all apps for production
  * `pnpm test:ci` - Run the test suite for all apps
  * `pnpm lint:check` - Check code linting for all apps

CMS app (`apps/cms`):
  * `pnpm --filter @gochamps/cms start` - Start the development server
  * `pnpm --filter @gochamps/cms build` - Build the app for production
  * `pnpm --filter @gochamps/cms test` - Run the test suite
  * `pnpm --filter @gochamps/cms test:e2e` - Run Cypress end-to-end tests
  * `pnpm --filter @gochamps/cms lint` - Fix code linting
  * `pnpm --filter @gochamps/cms lint:check` - Check code linting

## Documentation

  * See [OVERVIEW.md](OVERVIEW.md) for application purpose and features
  * See [ARCHITECTURE.md](ARCHITECTURE.md) for application architecture
  * See [IMPLEMENTATION.md](IMPLEMENTATION.md) for implementation guidelines
  * See [TESTING.md](TESTING.md) for testing guidelines

---

## License

- **[MIT license](https://github.com/lairjr/go-champs-web/blob/master/LICENSE)**
- Copyright 2019.
