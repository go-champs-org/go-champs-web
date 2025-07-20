module.exports = {
  beforeEach : function (client) {
    client
      .url(`${client.launchUrl}SignIn`)
      .useCss()
      .waitForElementVisible('body', 1000)
      .setValue('input[name="username"]', process.env.TEST_USERNAME)
      .setValue('input[name="password"]', process.env.TEST_PASSWORD)
      .click('button[type=submit]')
      .waitForElementVisible('body', 1000)
      .useXpath()
      .click("//*[contains(text(), 'Test Organization (cannot delete)')]")
      .click("//*[contains(text(), 'Test tournament (cannot delete)')]")
      .click("//*[contains(text(), 'Gerenciar')]")
      .click("//*[contains(text(), 'Fases')]")
  },

  'Add new phase': function (client) {
    client
      .assert.title('Go Champs | Test tournament (cannot delete)')
      .useCss()
      .pause(1000)
      .click('a[href="/test-organization-cannot-delete/test-tournament-cannot-delete/NewPhase"]')
      .pause(1000)
      .setValue('input[name="title"]', 'Test phase (can delete)')
      .pause(1000)
      .click('button[type=submit]')
      .useXpath()
      .click("//*[contains(text(), 'Voltar')]")
      .pause(1000)
      .refresh()
      .assert.visible("//*[contains(text(), 'Test phase (can delete)') and contains(@class, 'title')]")
      .end();
  },

  'Edit phase': function (client) {
    client
      .click("//*[contains(text(), 'Test phase (can delete)')]")
      .useCss()
      .pause(1000)
      .setValue('input[name="title"]', ' edited')
      .pause(500)
      .click('button[type=submit]')
      .useXpath()
      .click("//*[contains(text(), 'Voltar')]")
      .pause(1000)
      .refresh()
      .assert.visible("//*[contains(text(), 'Test phase (can delete) edited') and contains(@class, 'title')]")
      .end();
  },

  'Delete phase': function (client) {
    client
      .click("//*[contains(text(), 'Test phase (can delete) edited')]/../../div/button") 
      .click("//*[contains(text(), 'Test phase (can delete) edited')]/../../div/button") // needs to double click
      .pause(1000)
      .refresh()
      .pause(1000)
      .assert.not.elementPresent("//*[contains(text(), 'Test phase (can delete) edited') and contains(@class, 'title')]")
      .end();
  }
}