describe('Tournament Page Tests', () => {
  it('Load tournament page', () => {
    cy.visit('/demo-organization/demo-tournament')
    cy.get('body').should('be.visible')
    cy.title().should('eq', 'Go Champs | Demo Tournament')
  })

  it('Display elimination table', () => {
    cy.visit('/demo-organization/demo-tournament')
    cy.get('body').should('be.visible')
    cy.get('thead > tr > th:nth-child(1)').should('contain.text', 'Equipe')
    cy.get('thead > tr > th:nth-child(2)').should('contain.text', 'Vitórias')
    cy.get('thead > tr > th:nth-child(3)').should('contain.text', 'Derrotas')
    cy.get('tbody > tr:nth-child(1)').should('contain.text', 'Slytherin')
    cy.get('tbody > tr:nth-child(2)').should('contain.text', 'Ravenclaw')
    cy.get('tbody > tr:nth-child(3)').should('contain.text', 'Hufflepuff')
    cy.get('tbody > tr:nth-child(4)').should('contain.text', 'Gryffindor')
  })

  it('Display games', () => {
    cy.visit('/demo-organization/demo-tournament')
    cy.get('body').should('be.visible')
    cy.get('.card:nth-child(1) .card-content').should('contain.text', 'Slytherin')
    cy.get('.card:nth-child(1) .card-content').should('contain.text', 'Hufflepuff')
    cy.get('.card:nth-child(2) .card-content').should('contain.text', 'Ravenclaw')
    cy.get('.card:nth-child(2) .card-content').should('contain.text', 'Gryffindor')
  })

  it('Display rounds', () => {
    cy.visit('/demo-organization/demo-tournament')
    cy.get('body').should('be.visible')
    cy.get('.breadcrumb > ul > li:nth-child(2) > a').click()
    cy.get('.round:nth-child(1) > .card:nth-of-type(1)').should('contain.text', 'Primeiro lugar')
    cy.get('.round:nth-child(1) > .card:nth-of-type(1)').should('contain.text', 'Quarto lugar')
    cy.get('.round:nth-child(1) > .card:nth-of-type(2)').should('contain.text', 'Segundo lugar')
    cy.get('.round:nth-child(1) > .card:nth-of-type(2)').should('contain.text', 'Terceiro lugar')
    cy.get('.round:nth-child(2) > .card:nth-of-type(1)').should('contain.text', 'Ganhador S1')
    cy.get('.round:nth-child(2) > .card:nth-of-type(1)').should('contain.text', 'Ganhador S2')
  })
})