module.exports = {
  'Add new elimination': function (client) {
    client
      .url(`${client.launchUrl}test-organization-cannot-delete/test-tournament-cannot-delete`)
      .waitForElementVisible('body', 1000)
      .useXpath()
      .click("//*[contains(text(), 'Manage')]")
      .click("//*[contains(text(), 'Eliminations')]")
      .assert.title('Go Champs! | Test tournament (cannot delete)')
      .click("//*[contains(text(), 'New')]/../a")
      .pause(1000)
      .useCss()
      .setValue('input[name="title"]', 'Test elimination (can delete)')
      .setValue('input[name="info"]', 'Info')
      .click('button[type=submit]')
      .assert.containsText('.notification', 'Test elimination (can delete) created!')
      .end();
  },

  'Edit elimination': function (client) {
    client
    .url(`${client.launchUrl}test-organization-cannot-delete/test-tournament-cannot-delete`)
      .waitForElementVisible('body', 1000)
      .useXpath()
      .click("//*[contains(text(), 'Manage')]")
      .click("//*[contains(text(), 'Eliminations')]")
      .assert.title('Go Champs! | Test tournament (cannot delete)')
      .click("//*[contains(text(), 'Test elimination (can delete)')]")
      .useCss()
      .pause(1000)
      .setValue('input[name="title"]', ' edited')
      .click('button[type=submit]')
      .assert.containsText('.notification', 'Test elimination (can delete) edited updated!')
      .end();
  },

  'Delete elimination': function (client) {
    client
      .url(`${client.launchUrl}test-organization-cannot-delete/test-tournament-cannot-delete`)
      .waitForElementVisible('body', 1000)
      .useXpath()
      .click("//*[contains(text(), 'Manage')]")
      .click("//*[contains(text(), 'Eliminations')]")
      .assert.title('Go Champs! | Test tournament (cannot delete)')
      .click("//*[contains(text(), 'Test elimination (can delete) edited')]/../../div/button")
      .useCss()
      .assert.containsText('.notification', 'Test elimination (can delete) edited deleted!')
      .end();
  }
}