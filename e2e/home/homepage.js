module.exports = {
  'Load home page': function (client) {
    client
      .url(client.launchUrl)
      .waitForElementVisible('body', 1000)
      .assert.title('Go Champs!')
      .end();
  },

  'Navigates to search': function (client) {
    client
      .url(client.launchUrl)
      .waitForElementVisible('body', 1000)
      .click('a[href="/Search"]')
      .assert.title('Go Champs! | Search Tournaments')
      .end();
  },

  'Send email': function (client) {
    client
      .url(client.launchUrl)
      .waitForElementVisible('body', 1000)
      .setValue('input[name=name]', 'Some name')
      .setValue('input[name=email]', 'test@test.com')
      .setValue('textarea[name=message]', 'Some message')
      .click('button[type=submit]')
      .assert.containsText('.notification', 'Mensagem enviada com sucesso!')
      .end();
  }
}