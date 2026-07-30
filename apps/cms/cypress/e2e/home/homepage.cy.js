describe('Homepage Tests', () => {
  it('Load home page', () => {
    cy.visit('/')
    cy.get('body').should('be.visible')
    cy.title().should('eq', 'Go Champs')
  })

  it('Navigates to search', () => {
    cy.visit('/Search')
    cy.get('body').should('be.visible')
    cy.title().should('eq', 'Go Champs | Search Tournaments')
  })

  it('Search for tournament on home', () => {
    cy.visit('/')
    cy.get('.home-v2-search-input').type('demo-tournament')
    cy.get('.home-v2-grid').should('exist')
  })

  it('Send email', () => {
    cy.intercept('POST', 'https://api.emailjs.com/**', { statusCode: 200, body: 'OK' }).as('sendEmail')
    cy.visit('/Contact')
    cy.get('body').should('be.visible')
    cy.get('input[name=name]').type('Some name')
    cy.get('input[name=email]').type('test@test.com')
    cy.get('textarea[name=message]').type('Some message')
    cy.get('button[type=submit]').click()
    cy.wait('@sendEmail')
    cy.get('.notification').should('contain.text', 'Mensagem enviada com sucesso!')
  })
})