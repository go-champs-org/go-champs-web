describe('Search Page Tests', () => {
  it('Load search page', () => {
    cy.visit('/Search')
    cy.get('body').should('be.visible')
    cy.title().should('eq', 'Go Champs | Search Tournaments')
  })

  it('Finds "Demo Tournament" and navigates to it', () => {
    cy.visit('/Search')
    cy.get('body').should('be.visible')
    cy.get('input[name="searchTearm"]').type('Demo Tournament')
    cy.get('.tournament-mini-card header span').should('contain.text', 'Demo Tournament')
    cy.get('.tournament-mini-card header span').click()
    cy.title().should('eq', 'Go Champs | Demo Tournament')
  })
})