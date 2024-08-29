describe('Application loads', () => {
  beforeEach(() => {
    cy.viewport('macbook-16')
  })
  it('Loads the landing page', () => {
    cy.visit('localhost:3000')
    cy.get('[data-testid="hero-head"]')
  })
})