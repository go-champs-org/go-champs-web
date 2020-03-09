module.exports = {
  'Add new phase': function (client) {
    client
      .url(`${client.launchUrl}test-organization-cannot-delete/test-tournament-cannot-delete`)
      .waitForElementVisible('body', 1000)
      .useXpath()
      .click("//*[contains(text(), 'Manage')]")
      .click("//*[contains(text(), 'Phases')]")
      .assert.title('Go Champs! | Test tournament (cannot delete)')
      .useCss()
      .click('a[href="/test-organization-cannot-delete/test-tournament-cannot-delete/NewPhase"]')
      .pause(1000)
      .setValue('input[name="title"]', 'Test phase (can delete)')
      .pause(1000)
      .click('button[type=submit]')
      .assert.containsText('.notification', 'Test phase (can delete) created!')
      .end();
  },

  'Edit phase': function (client) {
    client
    .url(`${client.launchUrl}test-organization-cannot-delete/test-tournament-cannot-delete`)
      .waitForElementVisible('body', 1000)
      .useXpath()
      .click("//*[contains(text(), 'Manage')]")
      .click("//*[contains(text(), 'Phases')]")
      .click("//*[contains(text(), 'Test phase (can delete)')]")
      .useCss()
      .pause(1000)
      .setValue('input[name="title"]', ' edited')
      .click('button[type=submit]')
      .assert.containsText('.notification', 'Test phase (can delete) edited updated!')
      .end();
  },

  'Delete phase': function (client) {
    client
      .url(`${client.launchUrl}test-organization-cannot-delete/test-tournament-cannot-delete`)
      .waitForElementVisible('body', 1000)
      .useXpath()
      .click("//*[contains(text(), 'Manage')]")
      .click("//*[contains(text(), 'Phases')]")
      .click("//*[contains(text(), 'Test phase (can delete) edited')]/../../div/button[2]")
      .useCss()
      .assert.containsText('.notification', 'Test phase (can delete) edited deleted!')
      .end();
  }
}