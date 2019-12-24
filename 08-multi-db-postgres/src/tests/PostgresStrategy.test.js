const assert = require('assert') 
const Postgres = require('../db/strategies/postgres')

const Context = require('../db/strategies/base/ContextStrategy') 

const context = new Context(new Postgres()) 

describe('Postgres Strategy', function(){
    this.timeout(50000)
    it('PostgresSQL Connection', async function(){
        const result = await context.isConnected() 
        assert.equal(result, true) 
    })
})