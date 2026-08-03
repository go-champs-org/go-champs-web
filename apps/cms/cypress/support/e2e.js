// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Import cypress-xpath plugin
require('cypress-xpath')

// Force Portuguese language for all tests so the language detector
// picks up 'pt' via localStorage regardless of the browser's locale.
beforeEach(() => {
  cy.window().then(win => {
    win.localStorage.setItem('i18nextLng', 'pt');
  });
});

// Cloudflare's WAF rule on api.go-champs.com blocks non-GET requests unless
// the Origin header matches an allowlist. Cypress's network layer doesn't
// reliably reproduce that header on headless/CDP-driven requests, so every
// API call gets blocked in CI even though the same flow works for real users.
// This header is an allowlisted bypass configured on the Cloudflare rule.
const E2E_TEST_KEY = Cypress.env('E2E_TEST_KEY');

if (E2E_TEST_KEY) {
  beforeEach(() => {
    cy.intercept('**/v1/**', req => {
      req.headers['x-e2e-test-key'] = E2E_TEST_KEY;
    });
  });
}

// Alternatively you can use CommonJS syntax:
// require('./commands')