module.exports = {
  'Load search page': function (client) {
    client
      .url(`${client.launchUrl}Search`)
      .useCss()
      .waitForElementVisible('body', 1000)
      .assert.title('Go Champs | Search Tournaments')
      .end();
  },

  'Finds "Demo Tournament" and navigates to it': function (client) {
    client
      .url(`${client.launchUrl}Search`)
      .useCss()
      .waitForElementVisible('body', 1000)
      .setValue('input[name="searchTearm"]', 'Demo Tournament')
      .assert.containsText('.card-content .title', 'Demo Tournament')
      .click('.card-content .title')
      .assert.title('Go Champs | Demo Tournament')
      .end();
  },
}