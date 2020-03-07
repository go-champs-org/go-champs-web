module.exports = {
  'Load search page': function (client) {
    client
      .url(`${client.launchUrl}/demo-organization/demo-tournament`)
      .waitForElementVisible('body', 1000)
      .assert.title('Go Champs! | Demo Tournament')
      .end();
  },

  'Display elimination table': function (client) {
    client
      .url(`${client.launchUrl}/demo-organization/demo-tournament`)
      .waitForElementVisible('body', 1000)
      .assert.containsText('thead > tr > th:nth-child(1)', 'Equipe')
      .assert.containsText('thead > tr > th:nth-child(2)', 'Vitórias')
      .assert.containsText('thead > tr > th:nth-child(3)', 'Derrotas')
      .assert.containsText('tbody > tr:nth-child(1)', 'Slytherin')
      .assert.containsText('tbody > tr:nth-child(2)', 'Ravenclaw')
      .assert.containsText('tbody > tr:nth-child(3)', 'Hufflepuff')
      .assert.containsText('tbody > tr:nth-child(4)', 'Gryffindor')
      .end();
  },

  'Display games': function (client) {
    client
      .url(`${client.launchUrl}/demo-organization/demo-tournament`)
      .waitForElementVisible('body', 1000)
      .assert.containsText('.card:nth-child(1) .card-content', 'Slytherin')
      .assert.containsText('.card:nth-child(1) .card-content', 'Hufflepuff')
      .assert.containsText('.card:nth-child(2) .card-content', 'Ravenclaw')
      .assert.containsText('.card:nth-child(2) .card-content', 'Gryffindor')
      .end();
  }
}