describe('Account Page Tests', () => {
  it('Sign in and load account page', () => {
    cy.login()
    cy.title().should('eq', 'Go Champs | My Account')
  })

  it('List account organizations', () => {
    cy.login()
    cy.get('.card').should('exist')
  })
})