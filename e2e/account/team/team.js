module.exports = {
  'Add new team': function (client) {
    client
      .url(`${client.launchUrl}test-organization-cannot-delete/test-tournament-cannot-delete`)
      .useCss()
      .waitForElementVisible('body', 1000)
      .useXpath()
      .click("//*[contains(text(), 'Manage')]")
      .click("//*[contains(text(), 'Teams')]")
      .assert.title('Go Champs! | Test tournament (cannot delete)')
      .useCss()
      .click('a[href="/test-organization-cannot-delete/test-tournament-cannot-delete/NewTeam"]')
      .pause(1000)
      .setValue('input[name="name"]', 'Test team (can delete)')
      .click('button[type=submit]')
      .useXpath()
      .click("//*[contains(text(), 'Back')]")
      .assert.visible("//*[contains(text(), 'Test team (can delete)') and contains(@class, 'title')]")
      .end();
  },

  'Edit team': function (client) {
    client
    .url(`${client.launchUrl}test-organization-cannot-delete/test-tournament-cannot-delete`)
      .useCss()
      .waitForElementVisible('body', 1000)
      .useXpath()
      .click("//*[contains(text(), 'Manage')]")
      .click("//*[contains(text(), 'Teams')]")
      .click("//*[contains(text(), 'Test team (can delete)')]")
      .useCss()
      .pause(1000)
      .setValue('input[name="name"]', ' edited')
      .click('button[type=submit]')
      .useXpath()
      .click("//*[contains(text(), 'Back')]")
      .assert.visible("//*[contains(text(), 'Test team (can delete) edited') and contains(@class, 'title')]")
      .end();
  },

  'Delete team': function (client) {
    client
      .url(`${client.launchUrl}test-organization-cannot-delete/test-tournament-cannot-delete`)
      .useCss()
      .waitForElementVisible('body', 1000)
      .useXpath()
      .click("//*[contains(text(), 'Manage')]")
      .click("//*[contains(text(), 'Teams')]")
      .click("//*[contains(text(), 'Test team (can delete) edited')]/../../div/button")
      .pause(1000)
      .assert.not.elementPresent("//*[contains(text(), 'Test team (can delete) edited') and contains(@class, 'title')]")
      .end();
  }
}