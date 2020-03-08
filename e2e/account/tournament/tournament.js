module.exports = {
  'Add new tournament': function (client) {
    client
      .url(`${client.launchUrl}Organization/test-organization-cannot-delete`)
      .waitForElementVisible('body', 1000)
      .click('a[href="/Organization/test-organization-cannot-delete/NewTournament"]')
      .assert.title('Go Champs! | New Tournament')
      .pause(1000)
      .setValue('input[name="name"]', 'Test tournament (can delete)')
      .setValue('input[name="slug"]', 'test-tournament-can-delete')
      .click('button[type=submit]')
      .assert.containsText('.notification', 'Test tournament (can delete) created!')
      .end();
  },

  'Edit tournament': function (client) {
    client
    .url(`${client.launchUrl}Organization/test-organization-cannot-delete`)
      .waitForElementVisible('body', 1000)
      .useXpath()
      .click("//*[contains(text(), 'Test tournament (can delete)')]")
      .click("//*[contains(text(), 'Manage')]")
      .click("//*[contains(text(), 'Informations')]")
      .assert.title('Go Champs! | Edit Tournament')
      .useCss()
      .pause(1000)
      .setValue('input[name="name"]', ' edited')
      .click('button[type=submit]')
      .assert.containsText('.notification', 'Test tournament (can delete) edited updated!')
      .end();
  },

  'Delete tournament': function (client) {
    client
      .url(`${client.launchUrl}Organization/test-organization-cannot-delete`)
      .waitForElementVisible('body', 1000)
      .useXpath()
      .click("//*[contains(text(), 'Test tournament (can delete)')]/../../div/button")
      .useCss()
      .assert.containsText('.notification', 'Test tournament (can delete) edited deleted!')
      .end();
  }
}