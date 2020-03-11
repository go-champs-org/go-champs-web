module.exports = {
  'Add new tournament': function (client) {
    client
      .url(`${client.launchUrl}Organization/test-organization-cannot-delete`)
      .useCss()
      .waitForElementVisible('body', 1000)
      .click('a[href="/Organization/test-organization-cannot-delete/NewTournament"]')
      .assert.title('Go Champs! | New Tournament')
      .pause(1000)
      .setValue('input[name="name"]', 'Test tournament (can delete)')
      .setValue('input[name="slug"]', 'test-tournament-can-delete')
      .click('button[type=submit]')
      .useXpath()
      .click("//*[contains(text(), 'Back')]")
      .assert.visible("//*[contains(text(), 'Test tournament (can delete)')]")
      .end();
  },

  'Edit tournament': function (client) {
    client
      .url(`${client.launchUrl}Organization/test-organization-cannot-delete`)
      .useCss()
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
      .useXpath()
      .click("//*[contains(text(), 'Back')]")
      .assert.visible("//h1[contains(text(), 'Test tournament (can delete) edited')]")
      .end();
  },

  'Delete tournament': function (client) {
    client
      .url(`${client.launchUrl}Organization/test-organization-cannot-delete`)
      .useCss()
      .waitForElementVisible('body', 1000)
      .useXpath()
      .click("//*[contains(text(), 'Test tournament (can delete) edited')]/../../div/button")
      .assert.not.elementPresent("//*[contains(text(), 'Test tournement (can delete) edited')]")
      .end();
  }
}