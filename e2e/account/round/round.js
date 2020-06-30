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
      .click("//*[contains(text(), 'Test draw phase (cannot delete)')]")
      .click("//*[contains(text(), 'Draws')]")
  },

  'Add new draw': function (client) {
    client
      .assert.title('Go Champs! | Test tournament (cannot delete)')
      .click("//*[contains(text(), 'New')]/../a")
      .useCss()
      .pause(1000)
      .setValue('input[name="title"]', 'Test round (can delete)')
      .useXpath()
      .click("//*[contains(text(), 'Add match')]")
      .pause(1000)
      .click("(//*[contains(@class, 'fa-history')])[1]")
      .click("(//*[contains(@class, 'fa-history')])[2]")
      .useCss()
      .setValue('input[name="matches[0].firstTeamPlaceholder"]', 'First team placeholder')
      .setValue('input[name="matches[0].secondTeamPlaceholder"]', 'Second team placeholder')
      .pause(1000)
      .click('button[type=submit]')
      .useXpath()
      .click("//*[contains(text(), 'Back')]")
      .pause(1000)
      .assert.visible("//*[contains(text(), 'Test round (can delete)') and contains(@class, 'title')]")
      .end();
  },

  'Edit draw': function (client) {
    client
      .assert.title('Go Champs! | Test tournament (cannot delete)')
      .click("//*[contains(text(), 'Test round (can delete)')]")
      .useCss()
      .pause(1000)
      .setValue('input[name="title"]', ' edited')
      .pause(1000)
      .click('button[type=submit]')
      .useXpath()
      .click("//*[contains(text(), 'Back')]")
      .pause(1000)
      .assert.visible("//*[contains(text(), 'Test round (can delete) edited') and contains(@class, 'title')]")
      .end();
  },

  'Delete draw': function (client) {
    client
      .assert.title('Go Champs! | Test tournament (cannot delete)')
      .click("//*[contains(text(), 'Test round (can delete) edited')]/../../div/button")
      .click("//*[contains(text(), 'Test round (can delete) edited')]/../../div/button") // needs to double click
      .pause(1000)
      .assert.not.elementPresent("//*[contains(text(), 'Test round (can delete) edited') and contains(@class, 'title')]")
      .end();
  }
}