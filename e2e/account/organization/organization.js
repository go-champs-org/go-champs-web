module.exports = {
  'Add new organization': function (client) {
    client
      .url(`${client.launchUrl}Account`)
      .useCss()
      .waitForElementVisible('body', 1000)
      .click('a[href="/Account/NewOrganization"]')
      .assert.title('Go Champs! | New Organization')
      .pause(1000)
      .setValue('input[name="name"]', 'Test organization (can delete)')
      .setValue('input[name="slug"]', 'test-organization-can-delete')
      .pause(1000)
      .click('button[type=submit]')
      .useXpath()
      .click("//*[contains(text(), 'Back')]")
      .pause(1000)
      .refresh()
      .assert.visible("//*[contains(text(), 'Test organization (can delete)') and contains(@class, 'title')]")
      .end();
  },

  'Edit organization': function (client) {
    client
      .url(`${client.launchUrl}Account`)
      .useCss()
      .waitForElementVisible('body', 1000)
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
      .url(`${client.launchUrl}Account`)
      .useCss()
      .waitForElementVisible('body', 1000)
      .useXpath()
      .click("//*[contains(text(), 'Test organization (can delete) edited')]/../../div/button")
      .click("//*[contains(text(), 'Test organization (can delete) edited')]/../../div/button") // needs to double click
      .pause(1000)
      .assert.not.elementPresent("//*[contains(text(), 'Test organization (can delete) edited') and contains(@class, 'title')]")
      .end();
  }
}