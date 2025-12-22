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
      .click("//*[contains(text(), 'Grupos de classificação')]")
  },

  'Add new elimination': function (client) {
    client
      .assert.title('Go Champs | Test tournament (cannot delete)')
      .click("//*[contains(text(), 'Novo')]/../a")
      .pause(1000)
      .useCss()
      .setValue('input[name="title"]', 'Test elimination (can delete)')
      .setValue('input[name="info"]', 'Info')
      .useXpath()
      .click("//*[contains(text(), 'Adicionar linha')]")
      .setValue("//*[contains(text(), 'Select...')]/../div/div/input", ['Test team (cannot delete) A', client.Keys.ENTER])
      .pause(1000)
      .useCss()
      .click('button[type=submit]')
      .useXpath()
      .click("//*[contains(text(), 'Voltar')]")
      .pause(1000)
      .assert.visible("//*[contains(text(), 'Test elimination (can delete)') and contains(@class, 'title')]")
      .end();
  },

  'Edit elimination': function (client) {
    client
      .assert.title('Go Champs | Test tournament (cannot delete)')
      .click("//*[contains(text(), 'Test elimination (can delete)')]")
      .useCss()
      .pause(1000)
      .setValue('input[name="title"]', ' edited')
      .pause(1000)
      .click('button[type=submit]')
      .useXpath()
      .click("//*[contains(text(), 'Voltar')]")
      .pause(1000)
      .assert.visible("//*[contains(text(), 'Test elimination (can delete) edited') and contains(@class, 'title')]")
      .end();
  },

  'Delete elimination': function (client) {
    client
      .assert.title('Go Champs | Test tournament (cannot delete)')
      .click("//*[contains(text(), 'Test elimination (can delete) edited')]/../../div/button")
      .click("//*[contains(text(), 'Test elimination (can delete) edited')]/../../div/button") // needs to double click
      .pause(1000)
      .useCss()
      .assert.not.elementPresent('.card-header-title')
      .end();
  }
}