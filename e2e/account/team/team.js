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
      .click("//*[contains(text(), 'Equipes')]")
  },

  'Add new team': function (client) {
    client
      .assert.title('Go Champs! | Test tournament (cannot delete)')
      .useCss()
      .click('a[href="/test-organization-cannot-delete/test-tournament-cannot-delete/NewTeam"]')
      .pause(1000)
      .setValue('input[name="name"]', 'Test team (can delete)')
      .pause(500)
      .click('button[type=submit]')
      .useXpath()
      .click("//*[contains(text(), 'Voltar')]")
      .pause(1000)
      .assert.visible("//*[contains(text(), 'Test team (can delete)') and contains(@class, 'title')]")
      .end();
  },

  'Edit team': function (client) {
    client
      .click("//*[contains(text(), 'Test team (can delete)')]")
      .useCss()
      .pause(1000)
      .setValue('input[name="name"]', ' edited')
      .pause(500)
      .click('button[type=submit]')
      .useXpath()
      .click("//*[contains(text(), 'Voltar')]")
      .pause(1000)
      .assert.visible("//*[contains(text(), 'Test team (can delete) edited') and contains(@class, 'title')]")
      .end();
  },

  'Delete team': function (client) {
    client
      .click("//*[contains(text(), 'Test team (can delete) edited')]/../../div/button")
      .click("//*[contains(text(), 'Test team (can delete) edited')]/../../div/button") // needs to double click
      .pause(1000)
      .assert.not.elementPresent("//*[contains(text(), 'Test team (can delete) edited') and contains(@class, 'title')]")
      .end();
  }
}