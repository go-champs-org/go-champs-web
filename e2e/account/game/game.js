module.exports = {
  'Add new game': function (client) {
    client
      .url(`${client.launchUrl}test-organization-cannot-delete/test-tournament-cannot-delete`)
      .waitForElementVisible('body', 1000)
      .useXpath()
      .click("//*[contains(text(), 'Manage')]")
      .click("//*[contains(text(), 'Games')]")
      .assert.title('Go Champs! | Test tournament (cannot delete)')
      .click("//*[contains(text(), 'New')]/../a")
      .setValue("//*[contains(text(), 'Away team')]/../div/div/div/div/div/div[1]/input", ['Test team (cannot delete) A', client.Keys.ENTER])
      .setValue("//*[contains(text(), 'Home team')]/../div/div/div/div/div/div[1]/input", ['Test team (cannot delete) B', client.Keys.ENTER])
      .setValue("//*[contains(text(), 'Date / Time')]/../div/div[1]/p/input", ['1'])
      .useCss()
      .click('.rdtDay')
      .click('input[name="info"]')
      .setValue('input[name="info"]', 'Test game (can delete)')
      .click('button[type=submit]')
      .assert.containsText('.notification', 'Game created!')
      .end();
  },

  'Edit game': function (client) {
    client
    .url(`${client.launchUrl}test-organization-cannot-delete/test-tournament-cannot-delete`)
      .waitForElementVisible('body', 1000)
      .useXpath()
      .click("//*[contains(text(), 'Manage')]")
      .click("//*[contains(text(), 'Games')]")
      .assert.title('Go Champs! | Test tournament (cannot delete)')
      .click("//*[contains(text(), 'Test team (cannot delete) A')]")
      .useCss()
      .setValue('input[name="info"]', ' edited')
      .click('button[type=submit]')
      .assert.containsText('.notification', 'Game updated!')
      .end();
  },

  'Delete game': function (client) {
    client
      .url(`${client.launchUrl}test-organization-cannot-delete/test-tournament-cannot-delete`)
      .waitForElementVisible('body', 1000)
      .useXpath()
      .click("//*[contains(text(), 'Manage')]")
      .click("//*[contains(text(), 'Games')]")
      .assert.title('Go Champs! | Test tournament (cannot delete)')
      .click("//*[contains(text(), 'Test team (cannot delete) A')]/../../../../div/button")
      .useCss()
      .assert.containsText('.notification', 'Game deleted!')
      .end();
  }
}