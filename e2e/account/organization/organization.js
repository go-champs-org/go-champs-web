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
  },

  'Add new organization': function (client) {
    client
      .click('a[href="/Account/NewOrganization"]')
      .assert.title('Go Champs! | New Organization')
      .pause(1000)
      .setValue('input[name="name"]', 'Test organization (can delete)')
      .setValue('input[name="slug"]', 'test-organization-can-delete')
      .pause(1000)
      .click('button[type=submit]')
      .pause(1000)
      .refresh()
      .useXpath()
      .assert.visible("//*[contains(text(), 'Test organization (can delete)') and contains(@class, 'title')]")
      .end();
  },

  'Edit organization': function (client) {
    client
      .useXpath()
      .click("//*[contains(text(), 'Test organization (can delete)')]")
      .click("//*[contains(text(), 'Informations')]")
      .assert.title('Go Champs! | Edit Organization')
      .useCss()
      .pause(1000)
      .setValue('input[name="name"]', ' edited')
      .pause(1000)
      .click('button[type=submit]')
      .useXpath()
      .click("//*[contains(text(), 'Back')]")
      .pause(1000)
      .refresh()
      .assert.visible("//*[contains(text(), 'Test organization (can delete) edited') and contains(@class, 'title')]")
      .end();
  },

  'Delete organization': function (client) {
    client
      .useXpath()
      .click("//*[contains(text(), 'Test organization (can delete) edited')]/../../div/button")
      .click("//*[contains(text(), 'Test organization (can delete) edited')]/../../div/button") // needs to double click
      .pause(1000)
      .assert.not.elementPresent("//*[contains(text(), 'Test organization (can delete) edited') and contains(@class, 'title')]")
      .end();
  }
}