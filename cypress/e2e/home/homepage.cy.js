describe('Homepage Tests', () => {
  it('Load home page', () => {
    cy.visit('/')
    cy.get('body').should('be.visible')
    cy.title().should('eq', 'Go Champs')
  })

  it('Navigates to search', () => {
    cy.visit('/')
    cy.get('body').should('be.visible')
    cy.get('a[href="/Search"]').first().click()
    cy.title().should('eq', 'Go Champs | Search Tournaments')
  })

  it('Send email', () => {
    cy.visit('/')
    cy.get('body').should('be.visible')
    cy.get('a[href="/About"]').first().click()
    cy.get('input[name=name]').type('Some name')
    cy.get('input[name=email]').type('test@test.com')
    cy.get('textarea[name=message]').type('Some message')
    cy.get('button[type=submit]').click()
    cy.get('.notification').should('contain.text', 'Mensagem enviada com sucesso!')
  })
})