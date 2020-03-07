module.exports = {
  'Add new organization': function (client) {
    client
      .url(`${client.launchUrl}/Account`)
      .waitForElementVisible('body', 1000)
      .click('a[href="/Account/NewOrganization"]')
      .assert.title('Go Champs! | New Organization')
      .setValue('input[name="name"]', 'Test organization (can delete)')
      .setValue('input[name="slug"]', 'test-organization-can-delete')
      .click('button[type=submit]')
      .assert.containsText('.notification', 'Test organization (can delete) created!')
      .end();
  },

  'Edit organization': function (client) {
    client
      .url(`${client.launchUrl}/Account`)
      .waitForElementVisible('body', 1000)
      .useXpath()
      .click("//*[contains(text(), 'Test organization (can delete)')]")
      .click("//*[contains(text(), 'Informations')]")
      .assert.title('Go Champs! | Edit Organization')
      .useCss()
      .setValue('input[name="name"]', ' edited')
      .click('button[type=submit]')
      .assert.containsText('.notification', 'Test organization (can delete) edited updated!')
      .end();
  },

  'Delete organization': function (client) {
    client
      .url(`${client.launchUrl}/Account`)
      .waitForElementVisible('body', 1000)
      .useXpath()
      .click("//*[contains(text(), 'Test organization (can delete) edited')]/../../div/button")
      .useCss()
      .assert.containsText('.notification', 'Test organization (can delete) edited deleted!')
      .end();
  }
}