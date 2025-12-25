describe('Team Management', () => {
  beforeEach(() => {
    cy.visit('/SignIn')
    cy.get('body').should('be.visible')
    cy.get('input[name="username"]').type(Cypress.env('TEST_USERNAME'))
    cy.get('input[name="password"]').type(Cypress.env('TEST_PASSWORD'))
    cy.get('button[type=submit]').click()
    cy.get('body').should('be.visible')
    cy.xpath("//*[contains(text(), 'Gerencie seus campeonatos')]").click()
    cy.xpath("//*[contains(text(), 'Test Organization (cannot delete)')]").click()
    cy.xpath("//*[contains(text(), 'Test tournament (cannot delete)')]").click()
    cy.xpath("//*[contains(text(), 'Gerenciar')]").click()
    cy.xpath("//*[contains(text(), 'Equipes')]").click()
  })

  it('Add new team', () => {
    cy.title().should('eq', 'Go Champs | Test tournament (cannot delete)')
    cy.get('a[href="/test-organization-cannot-delete/test-tournament-cannot-delete/NewTeam"]').click()
    cy.wait(1000)
    cy.get('input[name="name"]').type('Test team (can delete)')
    cy.wait(500)
    cy.get('button[type=submit]').click()
    cy.xpath("//*[contains(text(), 'Voltar')]").click()
    cy.wait(1000)
    cy.xpath("//*[contains(text(), 'Test team (can delete)') and contains(@class, 'title')]").should('be.visible')
  })

  it('Edit team', () => {
    cy.xpath("//*[contains(text(), 'Test team (can delete)')]").click()
    cy.wait(1000)
    cy.get('input[name="name"]').type(' edited')
    cy.wait(500)
    cy.get('button[type=submit]').click()
    cy.xpath("//*[contains(text(), 'Voltar')]").click()
    cy.wait(1000)
    cy.xpath("//*[contains(text(), 'Test team (can delete) edited') and contains(@class, 'title')]").should('be.visible')
  })

  it('Delete team', () => {
    cy.xpath("//*[contains(text(), 'Test team (can delete) edited')]/../../div/button").dblclick()
    cy.wait(1000)
    cy.xpath("//*[contains(text(), 'Test team (can delete) edited') and contains(@class, 'title')]").should('not.exist')
  })
})