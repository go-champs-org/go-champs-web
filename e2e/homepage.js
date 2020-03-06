module.exports = {
  'Load home page' : function (client) {
    client
      .url('http://localhost:3000')
      .waitForElementVisible('body', 1000)
      .assert.title('Go Champs!')
      .end()
  }
}