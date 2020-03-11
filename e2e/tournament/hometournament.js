module.exports = {
  'Load tournament page': function (client) {
    client
      .url(`${client.launchUrl}demo-organization/demo-tournament`)
      .useCss()
      .waitForElementVisible('body', 1000)
      .assert.title('Go Champs! | Demo Tournament')
      .end();
  },

  'Display elimination table': function (client) {
    client
      .url(`${client.launchUrl}demo-organization/demo-tournament`)
      .useCss()
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
      .url(`${client.launchUrl}demo-organization/demo-tournament`)
      .useCss()
      .waitForElementVisible('body', 1000)
      .assert.containsText('.card:nth-child(1) .card-content', 'Slytherin')
      .assert.containsText('.card:nth-child(1) .card-content', 'Hufflepuff')
      .assert.containsText('.card:nth-child(2) .card-content', 'Ravenclaw')
      .assert.containsText('.card:nth-child(2) .card-content', 'Gryffindor')
      .end();
  },

  'Display rounds': function (client) {
    client
    .url(`${client.launchUrl}demo-organization/demo-tournament`)
    .useCss()
    .waitForElementVisible('body', 1000)
    .click('.breadcrumb > ul > li:nth-child(2) > a')
    .assert.containsText('.round:nth-child(1) > .card:nth-of-type(1)', 'Primeiro lugar')
    .assert.containsText('.round:nth-child(1) > .card:nth-of-type(1)', 'Quarto lugar')
    .assert.containsText('.round:nth-child(1) > .card:nth-of-type(2)', 'Segundo lugar')
    .assert.containsText('.round:nth-child(1) > .card:nth-of-type(2)', 'Terceiro lugar')
    .assert.containsText('.round:nth-child(2) > .card:nth-of-type(1)', 'Ganhador S1')
    .assert.containsText('.round:nth-child(2) > .card:nth-of-type(1)', 'Ganhador S2')
    .end();
  },
}