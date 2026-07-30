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

// Alternatively you can use CommonJS syntax:
// require('./commands')