module.exports = {
  'Load home page' : function (client) {
    client
      .url(client.launchUrl)
      .waitForElementVisible('body', 1000)
      .assert.title('Go Champs!')
      .end()
  }
}