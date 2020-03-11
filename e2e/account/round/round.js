module.exports = {
  'Add new round': function (client) {
    client
      .url(`${client.launchUrl}test-organization-cannot-delete/test-tournament-cannot-delete`)
      .useCss()
      .waitForElementVisible('body', 1000)
      .useXpath()
      .click("//*[contains(text(), 'Test draw phase (cannot delete)')]")
      .click("//*[contains(text(), 'Rounds')]")
      .assert.title('Go Champs! | Test tournament (cannot delete)')
      .click("//*[contains(text(), 'New')]/../a")
      .useCss()
      .pause(1000)
      .setValue('input[name="title"]', 'Test round (can delete)')
      .useXpath()
      .click("//*[contains(text(), 'Add match')]")
      .useCss()
      .setValue('input[name="matches[0].firstTeamPlaceholder"]', 'First team placeholder')
      .setValue('input[name="matches[0].secondTeamPlaceholder"]', 'Second team placeholder')
      .pause(1000)
      .click('button[type=submit]')
      .useXpath()
      .click("//*[contains(text(), 'Back')]")
      .refresh()
      .assert.visible("//*[contains(text(), 'Test round (can delete)') and contains(@class, 'title')]")
      .end();
  },

  'Edit round': function (client) {
    client
    .url(`${client.launchUrl}test-organization-cannot-delete/test-tournament-cannot-delete`)
    .useCss()
      .waitForElementVisible('body', 1000)
      .useXpath()
      .click("//*[contains(text(), 'Test draw phase (cannot delete)')]")
      .click("//*[contains(text(), 'Rounds')]")
      .assert.title('Go Champs! | Test tournament (cannot delete)')
      .click("//*[contains(text(), 'Test round (can delete)')]")
      .useCss()
      .pause(1000)
      .setValue('input[name="title"]', ' edited')
      .pause(1000)
      .click('button[type=submit]')
      .useXpath()
      .click("//*[contains(text(), 'Back')]")
      .refresh()
      .assert.visible("//*[contains(text(), 'Test round (can delete) edited') and contains(@class, 'title')]")
      .end();
  },

  'Delete round': function (client) {
    client
      .url(`${client.launchUrl}test-organization-cannot-delete/test-tournament-cannot-delete`)
      .useCss()
      .waitForElementVisible('body', 1000)
      .useXpath()
      .click("//*[contains(text(), 'Test draw phase (cannot delete)')]")
      .click("//*[contains(text(), 'Rounds')]")
      .assert.title('Go Champs! | Test tournament (cannot delete)')
      .click("//*[contains(text(), 'Test round (can delete) edited')]/../../div/button")
      .pause(1000)
      .assert.not.elementPresent("//*[contains(text(), 'Test round (can delete) edited') and contains(@class, 'title')]")
      .end();
  }
}