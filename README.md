# Go Champs Front-End ![build status](https://github.com/lairjr/go-champs-web/actions/workflows/master-ci.yml/badge.svg)

*This is the Go Champs Front-End repository.*

Go Champs is a comprehensive tournament management platform that serves as both a CMS for tournament organizers and a public viewing experience for fans and participants.

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

## Getting Started

### Prerequisites
- Node.js (recommended version specified in `.nvmrc`)
- Yarn package manager

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
2. Install dependencies: `yarn`
3. Start the development server: `yarn start`
4. Run tests: `yarn test`

### Available Scripts

After setup, you can run these commands:
  * `yarn start` - Start the development server
  * `yarn build` - Build the app for production
  * `yarn test` - Run the test suite
  * `yarn lint` - Run code linting

## Documentation

  * See [OVERVIEW.md](OVERVIEW.md) for application purpose and features
  * See [ARCHITECTURE.md](ARCHITECTURE.md) for application architecture
  * See [IMPLEMENTATION.md](IMPLEMENTATION.md) for implementation guidelines
  * See [TESTING.md](TESTING.md) for testing guidelines

---

## License

- **[MIT license](https://github.com/lairjr/go-champs-web/blob/master/LICENSE)**
- Copyright 2019.
