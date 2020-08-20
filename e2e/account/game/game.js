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
      .click("//*[contains(text(), 'Manage')]")
      .click("//*[contains(text(), 'Games')]")
  },

  'Add new game': function (client) {
    client
      .assert.title('Go Champs! | Test tournament (cannot delete)')
      .click("//*[contains(text(), 'New')]/../a")
      .pause(1000)
      .setValue("//*[contains(text(), 'Away team')]/../div/div/div/div/div/div[1]/input", ['Test team (cannot delete) A', client.Keys.ENTER])
      .setValue("//*[contains(text(), 'Home team')]/../div/div/div/div/div/div[1]/input", ['Test team (cannot delete) B', client.Keys.ENTER])
      .setValue("//*[contains(text(), 'Date | Time')]/../div/div[1]/p/input", ['1'])
      .useCss()
      .click('.rdtDay')
      .click('input[name="info"]')
      .setValue('input[name="info"]', 'Test game (can delete)')
      .pause(1000)
      .click('button[type=submit]')
      .useXpath()
      .click("//*[contains(text(), 'Back')]")
      .pause(1000)
      .useCss()
      .assert.containsText('.card-header-title', 'Test team (cannot delete) A')
      .end();
  },

  'Edit game': function (client) {
    client
      .assert.title('Go Champs! | Test tournament (cannot delete)')
      .click("//*[contains(text(), 'Test team (cannot delete) A')]")
      .useCss()
      .pause(1000)
      .setValue('input[name="info"]', ' edited')
      .pause(1000)
      .click('button[type=submit]')
      .useXpath()
      .click("//*[contains(text(), 'Back')]")
      .pause(1000)
      .useCss()
      .assert.containsText('.card-header-title', 'Test team (cannot delete) A')
      .end();
  },

  'Delete game': function (client) {
    client
      .assert.title('Go Champs! | Test tournament (cannot delete)')
      .click("//*[contains(text(), 'Test team (cannot delete) A')]/../../../../div/button")
      .click("//*[contains(text(), 'Test team (cannot delete) A')]/../../../../div/button") // needs to double click
      .pause(1000)
      .useCss()
      .assert.not.elementPresent('.card-header-title')
      .end();
  }
}