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
  },

  'Add new tournament': function (client) {
    client
      .useCss()
      .click('a[href="/Organization/test-organization-cannot-delete/NewTournament"]')
      .assert.title('Go Champs | New Tournament')
      .pause(1000)
      .setValue('input[name="name"]', 'Test tournament (can delete)')
      .setValue('input[name="slug"]', 'test-tournament-can-delete')
      .pause(500)
      .click('button[type=submit]')
      .useXpath()
      .click("//*[contains(text(), 'Voltar')]")
      .pause(1000)
      .assert.visible("//*[contains(text(), 'Test tournament (can delete)') and contains(@class, 'title')]")
      .end();
  },

  'Edit tournament': function (client) {
    client
      .click("//*[contains(text(), 'Test tournament (can delete)')]")
      .click("//*[contains(text(), 'Gerenciar')]")
      .click("//*[contains(text(), 'Informacões')]")
      .assert.title('Go Champs | Edit Tournament')
      .useCss()
      .pause(1000)
      .setValue('input[name="name"]', ' edited')
      .pause(500)
      .click('button[type=submit]')
      .useXpath()
      .click("//*[contains(text(), 'Voltar')]")
      .pause(1000)
      .assert.visible("//h1[contains(text(), 'Test tournament (can delete) edited') and contains(@class, 'title')]")
      .end();
  },

  'Delete tournament': function (client) {
    client
      .useXpath()
      .click("//*[contains(text(), 'Test tournament (can delete) edited')]/../../div/button")
      .click("//*[contains(text(), 'Test tournament (can delete) edited')]/../../div/button") // needs to double click
      .pause(1000)
      .assert.not.elementPresent("//*[contains(text(), 'Test tournement (can delete) edited') and contains(@class, 'title')]")
      .end();
  }
}