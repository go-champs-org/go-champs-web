describe('Player Management', () => {
  const goToPlayersList = () => {
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
    cy.get('.ai-chat-window__close').click();
    cy.xpath("//*[contains(text(), 'Atletas')]").click()
  }

  // Defensive cleanup: previous runs that failed mid-way (e.g. a flaky delete
  // step) can leave stray "Test player (can delete)" records behind, which
  // makes every xpath below match more than one element on the next run.
  // Clear the slate once before the suite so each run starts from zero.
  // Uses document.evaluate directly (not cy.xpath) because cy.xpath retries
  // and fails when nothing matches, and the empty-result case here is the
  // expected way this recursion ends.
  const deleteExistingTestPlayers = () => {
    cy.document().then((doc) => {
      const result = doc.evaluate(
        "//*[contains(text(), 'Test player (can delete)')]/../../div/button",
        doc,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      )
      const button = result.singleNodeValue
      if (!button) {
        return
      }
      cy.wrap(button).dblclick()
      cy.wait(1000)
      deleteExistingTestPlayers()
    })
  }

  before(() => {
    goToPlayersList()
    deleteExistingTestPlayers()
  })

  beforeEach(() => {
    goToPlayersList()
  })

  it('Add new player', () => {
    cy.title().should('eq', 'Go Champs | Test tournament (cannot delete)')
    cy.get('a[href="/test-organization-cannot-delete/test-tournament-cannot-delete/NewPlayer"]').click()
    cy.wait(1000)
    cy.get('input[name="name"]').type('Test player (can delete)')
    cy.xpath("//*[contains(text(), 'Equipe')]/../div/div/div/div/div/div[1]/input").type('Test team (cannot delete) A{enter}', {force: true})
    cy.wait(500)
    cy.get('button[type=submit]').click()
    cy.xpath("//*[contains(text(), 'Voltar')]").click()
    cy.wait(1000)
    cy.xpath("//*[contains(text(), 'Test player (can delete)') and contains(@class, 'title')]").should('be.visible')
  })

  it('Edit player', () => {
    cy.xpath("//*[contains(text(), 'Test player (can delete)')]").click()
    cy.wait(1000)
    cy.get('input[name="name"]').type(' edited')
    cy.wait(500)
    cy.get('button[type=submit]').click()
    cy.xpath("//*[contains(text(), 'Voltar')]").click()
    cy.wait(1000)
    cy.xpath("//*[contains(text(), 'Test player (can delete) edited') and contains(@class, 'title')]").should('be.visible')
  })

  it('Delete player', () => {
    cy.xpath("//*[contains(text(), 'Test player (can delete) edited')]/../../div/button").dblclick()
    cy.wait(1000)
    cy.xpath("//*[contains(text(), 'Test player (can delete) edited') and contains(@class, 'title')]").should('not.exist')
  })
})