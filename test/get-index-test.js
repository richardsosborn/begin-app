let sandbox = require('@architect/sandbox')
let data = require('@begin/data')
let tiny = require('tiny-json-http')
let assert = require('assert')

describe('mocha app', () => {

  // start and end sandbox to execute tests
  before(async () => {
    await sandbox.start({ quiet: true})
  })

  after(async () => {
    await sandbox.end()
  })

  // makes sure a GET response has no errors
  describe('@http', function() {
    it('should get /', async () => {
      let url = 'http://localhost:3333'
      let result = await tiny.get({url})
      assert.ok(result)
    })
  })

  // tests that @begin/data can write a table
  describe('@begin/data', function() {
    it('data.set', async () => {
      let result = await data.set({table: 'tmp'})
      assert.equal(result.table, 'tmp')
      console.log(result)
    })

    // tests that @begin/data can read the table
    it('data.get', async () => {
      let result = await data.get({table: 'tmp'})
      assert.equal(result.length, 1)
      console.log(result)
    })
  })

})
