module.exports = {
  'Add new elimination': function (client) {
    client
      .url(`${client.launchUrl}test-organization-cannot-delete/test-tournament-cannot-delete`)
      .useCss()
      .waitForElementVisible('body', 1000)
      .useXpath()
      .click("//*[contains(text(), 'Manage')]")
      .click("//*[contains(text(), 'Eliminations')]")
      .assert.title('Go Champs! | Test tournament (cannot delete)')
      .click("//*[contains(text(), 'New')]/../a")
      .pause(1000)
      .useCss()
      .setValue('input[name="title"]', 'Test elimination (can delete)')
      .setValue('input[name="info"]', 'Info')
      .pause(1000)
      .click('button[type=submit]')
      .useXpath()
      .click("//*[contains(text(), 'Back')]")
      .assert.visible("//*[contains(text(), 'Test elimination (can delete)')]")
      .end();
  },

  'Edit elimination': function (client) {
    client
    .url(`${client.launchUrl}test-organization-cannot-delete/test-tournament-cannot-delete`)
      .useCss()
      .waitForElementVisible('body', 1000)
      .useXpath()
      .click("//*[contains(text(), 'Manage')]")
      .click("//*[contains(text(), 'Eliminations')]")
      .assert.title('Go Champs! | Test tournament (cannot delete)')
      .click("//*[contains(text(), 'Test elimination (can delete)')]")
      .useCss()
      .pause(1000)
      .setValue('input[name="title"]', ' edited')
      .pause(1000)
      .click('button[type=submit]')
      .useXpath()
      .click("//*[contains(text(), 'Back')]")
      .assert.visible("//*[contains(text(), 'Test elimination (can delete) edited')]")
      .end();
  },

  'Delete elimination': function (client) {
    client
      .url(`${client.launchUrl}test-organization-cannot-delete/test-tournament-cannot-delete`)
      .useCss()
      .waitForElementVisible('body', 1000)
      .useXpath()
      .click("//*[contains(text(), 'Manage')]")
      .click("//*[contains(text(), 'Eliminations')]")
      .assert.title('Go Champs! | Test tournament (cannot delete)')
      .click("//*[contains(text(), 'Test elimination (can delete) edited')]/../../div/button")
      .useCss()
      .assert.not.elementPresent('.card-header-title')
      .end();
  }
}