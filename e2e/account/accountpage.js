module.exports = {
  'Load account page': function (client) {
    client
      .url(`${client.launchUrl}/Account`)
      .waitForElementVisible('body', 1000)
      .assert.title('Go Champs! | My Account')
      .end();
  },

  'List account organizations': function (client) {
    client
      .url(`${client.launchUrl}/Account`)
      .waitForElementVisible('body', 1000)
      .assert.elementPresent('.card')
      .end();
  }
}