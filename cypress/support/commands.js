// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom command for basic authentication only
Cypress.Commands.add('login', () => {
  cy.visit('/SignIn')
  cy.get('body').should('be.visible')
  cy.get('input[name="username"]').type(Cypress.env('TEST_USERNAME'))
  cy.get('input[name="password"]').type(Cypress.env('TEST_PASSWORD'))
  cy.get('button[type=submit]').click()
  cy.get('body').should('be.visible')
})