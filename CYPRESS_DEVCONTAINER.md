# Cypress DevContainer Setup

This document describes how to run Cypress e2e tests in the devcontainer environment.

## Setup

The devcontainer is configured with all necessary dependencies for running Cypress:

### System Dependencies
- **Xvfb** - Virtual display server for headless testing
- **GTK libraries** - libgtk2.0-0, libgtk-3-0, libgbm-dev
- **Audio/Video** - libasound2, libnotify-dev, libnss3
- **X11 components** - libxss1, libxtst6, xauth, xfonts-*

### Environment Variables
- `DISPLAY=:99` - Points to the virtual display

## Running Tests

### Available Commands

```bash
# Run all Cypress tests (headless)
yarn test:e2e

# Run with explicit Xvfb (recommended in devcontainer)
yarn test:e2e:headless

# Environment-specific test runs
yarn test:e2e:local    # Using local environment configuration  
yarn test:e2e:staging  # Using staging environment configuration
yarn test:e2e:prod     # Using production environment configuration

# Open Cypress Test Runner (requires X11 forwarding)
yarn test:e2e:open
```

### Running Specific Test Sets

#### Run tests by folder/category:
```bash
# Public tests (no authentication required)
yarn test:e2e:headless --spec "cypress/e2e/home/**,cypress/e2e/search/**,cypress/e2e/tournament/**"

# Account/authenticated tests only
yarn test:e2e:headless --spec "cypress/e2e/account/**"

# Specific functionality tests
yarn test:e2e:headless --spec "cypress/e2e/account/elimination/**"
yarn test:e2e:headless --spec "cypress/e2e/account/tournament/**"  
yarn test:e2e:headless --spec "cypress/e2e/account/organization/**"
```

#### Run specific test files:
```bash
# Single test file
yarn test:e2e:headless --spec "cypress/e2e/home/homepage.cy.js"

# Multiple specific files
yarn test:e2e:headless --spec "cypress/e2e/home/homepage.cy.js,cypress/e2e/search/searchpage.cy.js"
```

#### Run tests by pattern:
```bash
# All tests with "tournament" in the path
yarn test:e2e:headless --spec "**/*tournament*"

# All account management tests
yarn test:e2e:headless --spec "cypress/e2e/account/*/*.cy.js"
```

### Test Categories

**Public Tests** (No authentication):
- `home/homepage.cy.js` - Homepage functionality
- `search/searchpage.cy.js` - Search functionality  
- `tournament/hometournament.cy.js` - Public tournament pages

**Account Tests** (Require authentication):
- `account/accountpage.cy.js` - Account management
- `account/organization/organization.cy.js` - Organization CRUD
- `account/tournament/tournament.cy.js` - Tournament management
- `account/elimination/elimination.cy.js` - Elimination brackets
- `account/game/game.cy.js` - Game management
- `account/phase/phase.cy.js` - Phase management
- `account/player/player.cy.js` - Player management
- `account/round/round.cy.js` - Round/Draw management
- `account/team/team.cy.js` - Team management

### Manual Setup (if needed)

If you need to manually start the display server:

```bash
# Start Xvfb in background
/workspace/.devcontainer/setup-cypress.sh

# Or manually:
export DISPLAY=:99
Xvfb :99 -screen 0 1024x768x24 > /dev/null 2>&1 &
```

### Environment-Specific Testing

The tests will automatically detect the environment based on these variables:
- `STAGING_APP_HOST` - for staging environment
- `PROD_APP_HOST` - for production environment
- Falls back to `http://localhost:3000` for local development

### Authentication

Tests requiring authentication will use:
- `TEST_USERNAME` - from environment variables or cypress.env.json
- `TEST_PASSWORD` - from environment variables or cypress.env.json

**Setup authentication credentials:**

Option 1 - Environment variables:
```bash
export TEST_USERNAME="your-test-username"
export TEST_PASSWORD="your-test-password"
yarn test:e2e:headless
```

Option 2 - Create `cypress.env.json` file:
```json
{
  "TEST_USERNAME": "your-test-username",
  "TEST_PASSWORD": "your-test-password"
}
```

Option 3 - Inline with command:
```bash
TEST_USERNAME="user" TEST_PASSWORD="pass" yarn test:e2e:headless
```

## Troubleshooting

### Common Issues

1. **Error: spawn Xvfb ENOENT**
   - Solution: Run `yarn install` to ensure Cypress is properly installed
   - Or run `/workspace/.devcontainer/setup-cypress.sh`

2. **Display not found**
   - Solution: Ensure `DISPLAY=:99` is set and Xvfb is running
   - Check with: `ps aux | grep Xvfb`

3. **Browser launch issues**
   - Solution: Use `yarn test:e2e:headless` instead of `yarn test:e2e`
   - This uses `xvfb-run` wrapper for better stability

### Debugging

To debug test failures:
- Videos are saved to `cypress/videos/`
- Screenshots are saved to `cypress/screenshots/`
- Enable verbose logging: `DEBUG=cypress:* yarn test:e2e`

## CI Integration

The CI workflows automatically:
1. Install Cypress system dependencies
2. Set up environment variables
3. Run tests with `xvfb-run -a yarn test:e2e`

No manual setup required in GitHub Actions.