describe('Elimination Tests', () => {
  beforeEach(() => {
    cy.loginAndNavigateToEliminations()
  })

  it('Add new elimination', () => {
    cy.title().should('eq', 'Go Champs | Test tournament (cannot delete)')
    cy.xpath("//*[contains(text(), 'Novo')]/../a").click()
    cy.wait(1000)
    cy.get('input[name="title"]').type('Test elimination (can delete)')
    cy.get('input[name="info"]').type('Info')
    cy.xpath("//*[contains(text(), 'Adicionar linha')]").click()
    cy.xpath("//*[contains(text(), 'Select...')]/../div/div/input").first().type('Test team (cannot delete) A{enter}',{force: true})
    cy.wait(1000)
    cy.get('button[type=submit]').click()
    cy.xpath("//*[contains(text(), 'Voltar')]").click()
    cy.wait(1000)
    cy.xpath("//*[contains(text(), 'Test elimination (can delete)') and contains(@class, 'title')]").should('be.visible')
  })

  it('Edit elimination', () => {
    cy.title().should('eq', 'Go Champs | Test tournament (cannot delete)')
    cy.xpath("//*[contains(text(), 'Test elimination (can delete)')]").click()
    cy.wait(1000)
    cy.get('input[name="title"]').type(' edited')
    cy.wait(1000)
    cy.get('button[type=submit]').click()
    cy.xpath("//*[contains(text(), 'Voltar')]").click()
    cy.wait(1000)
    cy.xpath("//*[contains(text(), 'Test elimination (can delete) edited') and contains(@class, 'title')]").should('be.visible')
  })

  it('Delete elimination', () => {
    cy.title().should('eq', 'Go Champs | Test tournament (cannot delete)')
    cy.xpath("//*[contains(text(), 'Test elimination (can delete) edited')]/../../div/button").dblclick()
    cy.wait(1000)
    cy.get('.card-header-title').should('not.exist')
  })
})