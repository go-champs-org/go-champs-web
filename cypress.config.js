const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.STAGING_APP_HOST || process.env.PROD_APP_HOST || 'http://localhost:3000',
    viewportWidth: 1600,
    viewportHeight: 900,
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      TEST_PASSWORD: process.env.TEST_PASSWORD,
      TEST_USERNAME: process.env.TEST_USERNAME
    }
  },
  // Additional configuration for headless environments
  chromeWebSecurity: false,
  numTestsKeptInMemory: 0
})