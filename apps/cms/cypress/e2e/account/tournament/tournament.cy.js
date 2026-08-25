describe('Tournament Management', () => {
  beforeEach(() => {
    cy.visit('/SignIn')
    cy.get('body').should('be.visible')
    cy.get('input[name="username"]').type(Cypress.env('TEST_USERNAME'))
    cy.get('input[name="password"]').type(Cypress.env('TEST_PASSWORD'))
    cy.get('button[type=submit]').click()
    cy.get('body').should('be.visible')
    cy.xpath("//*[contains(text(), 'Gerencie seus campeonatos')]").click()
    cy.xpath("//*[contains(text(), 'Test Organization (cannot delete)')]").click()
  })

  it('Add new tournament', () => {
    cy.get('a[href="/Organization/test-organization-cannot-delete/NewTournament"]').click()
    cy.title().should('eq', 'Go Champs | New Tournament')
    cy.wait(1000)
    cy.get('input[name="name"]').type('Test tournament (can delete)')
    cy.get('input[name="slug"]').type('test-tournament-can-delete')
    cy.wait(500)
    cy.get('button[type=submit]').click()
    cy.xpath("//*[contains(text(), 'Voltar')]").click()
    cy.wait(1000)
    cy.xpath("//*[contains(text(), 'Test tournament (can delete)') and contains(@class, 'title')]").should('be.visible')
  })

  it('Edit tournament', () => {
    cy.xpath("//*[contains(text(), 'Test tournament (can delete)')]").click()
    cy.xpath("//*[contains(text(), 'Gerenciar')]").click()
    cy.get('.ai-chat-window__close').click();
    cy.xpath("//*[contains(text(), 'Informacões')]").click()
    cy.title().should('eq', 'Go Champs | Edit Tournament')
    cy.wait(1000)
    cy.get('input[name="name"]').type(' edited')
    cy.wait(500)
    cy.get('button[type=submit]').click()
    cy.xpath("//*[contains(text(), 'Voltar')]").click()
    cy.wait(1000)
    cy.xpath("//h1[contains(text(), 'Test tournament (can delete) edited') and contains(@class, 'title')]").should('be.visible')
  })

  it('Archive and unarchive tournament', () => {
    cy.get(
      'button[aria-label="Arquivar: Test tournament (can delete) edited"]'
    ).click()
    cy.wait(1000)
    cy.get(
      'button[aria-label="Arquivar: Test tournament (can delete) edited"]'
    ).should('not.exist')

    cy.xpath("//button[contains(., 'Arquivados')]").click()
    cy.wait(1000)
    cy.get(
      'button[aria-label="Desarquivar: Test tournament (can delete) edited"]'
    )
      .should('be.visible')
      .click()
    cy.wait(1000)
    cy.get(
      'button[aria-label="Desarquivar: Test tournament (can delete) edited"]'
    ).should('not.exist')

    cy.xpath("//button[contains(., 'Arquivados')]").click()
    cy.wait(1000)
    cy.get(
      'button[aria-label="Arquivar: Test tournament (can delete) edited"]'
    ).should('be.visible')
  })

  it('Delete tournament', () => {
    cy.get(
      'button[aria-label="Remover: Test tournament (can delete) edited"]'
    ).dblclick()
    cy.wait(1000)
    cy.get(
      'button[aria-label="Remover: Test tournament (can delete) edited"]'
    ).should('not.exist')
  })
})
