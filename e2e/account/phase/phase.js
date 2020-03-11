module.exports = {
  'Add new phase': function (client) {
    client
      .url(`${client.launchUrl}test-organization-cannot-delete/test-tournament-cannot-delete`)
      .useCss()
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
      .useXpath()
      .click("//*[contains(text(), 'Back')]")
      .refresh()
      .assert.visible("//*[contains(text(), 'Test phase (can delete)') and contains(@class, 'title')]")
      .end();
  },

  'Edit phase': function (client) {
    client
    .url(`${client.launchUrl}test-organization-cannot-delete/test-tournament-cannot-delete`)
    .useCss()
      .waitForElementVisible('body', 1000)
      .useXpath()
      .click("//*[contains(text(), 'Manage')]")
      .click("//*[contains(text(), 'Phases')]")
      .click("//*[contains(text(), 'Test phase (can delete)')]")
      .useCss()
      .pause(1000)
      .setValue('input[name="title"]', ' edited')
      .pause(500)
      .click('button[type=submit]')
      .useXpath()
      .click("//*[contains(text(), 'Back')]")
      .refresh()
      .assert.visible("//*[contains(text(), 'Test phase (can delete) edited') and contains(@class, 'title')]")
      .end();
  },

  'Delete phase': function (client) {
    client
      .url(`${client.launchUrl}test-organization-cannot-delete/test-tournament-cannot-delete`)
      .useCss()
      .waitForElementVisible('body', 1000)
      .useXpath()
      .click("//*[contains(text(), 'Manage')]")
      .click("//*[contains(text(), 'Phases')]")
      .click("//*[contains(text(), 'Test phase (can delete) edited')]/../../div/button[2]")
      .pause(1000)
      .refresh()
      .assert.not.elementPresent("//*[contains(text(), 'Test phase (can delete) edited') and contains(@class, 'title')]")
      .end();
  }
}