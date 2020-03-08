module.exports = {
  'Add new round': function (client) {
    client
      .url(`${client.launchUrl}/test-organization-cannot-delete/test-tournament-cannot-delete`)
      .waitForElementVisible('body', 1000)
      .useXpath()
      .click("//*[contains(text(), 'Test draw phase (cannot delete)')]")
      .click("//*[contains(text(), 'Rounds')]")
      .assert.title('Go Champs! | Test tournament (cannot delete)')
      .click("//*[contains(text(), 'New')]/../a")
      .useCss()
      .setValue('input[name="title"]', 'Test round (can delete)')
      .useXpath()
      .click("//*[contains(text(), 'Add match')]")
      .useCss()
      .setValue('input[name="matches[0].firstTeamPlaceholder"]', 'First team placeholder')
      .setValue('input[name="matches[0].secondTeamPlaceholder"]', 'Second team placeholder')
      .click('button[type=submit]')
      .assert.containsText('.notification', 'Test round (can delete) created!')
      .end();
  },

  'Edit round': function (client) {
    client
    .url(`${client.launchUrl}/test-organization-cannot-delete/test-tournament-cannot-delete`)
      .waitForElementVisible('body', 1000)
      .useXpath()
      .click("//*[contains(text(), 'Test draw phase (cannot delete)')]")
      .click("//*[contains(text(), 'Rounds')]")
      .assert.title('Go Champs! | Test tournament (cannot delete)')
      .click("//*[contains(text(), 'Test round (can delete)')]")
      .useCss()
      .setValue('input[name="title"]', ' edited')
      .click('button[type=submit]')
      .assert.containsText('.notification', 'Test round (can delete) edited updated!')
      .end();
  },

  'Delete round': function (client) {
    client
      .url(`${client.launchUrl}/test-organization-cannot-delete/test-tournament-cannot-delete`)
      .waitForElementVisible('body', 1000)
      .useXpath()
      .click("//*[contains(text(), 'Test draw phase (cannot delete)')]")
      .click("//*[contains(text(), 'Rounds')]")
      .assert.title('Go Champs! | Test tournament (cannot delete)')
      .click("//*[contains(text(), 'Test round (can delete) edited')]/../../div/button")
      .useCss()
      .assert.containsText('.notification', 'Test round (can delete) edited deleted!')
      .end();
  }
}