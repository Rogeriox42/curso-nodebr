const assert = require('assert') 
const Postgres = require('../db/strategies/postgres')

const Context = require('../db/strategies/base/ContextStrategy') 

const context = new Context(new Postgres()) 
const MOCK_HEROI_CADASTRAR = {nome: 'Hal Jordan', poder: 'Green Ring'}
const MOCK_DELETE_ID = 13

describe('Postgres Strategy', function(){
    this.timeout(50000)
    it('PostgresSQL Connection', async function(){
        const result = await context.isConnected() 
        assert.equal(result, true) 
    })
    it('Cadastrar', async function(){
        const result = await context.create(MOCK_HEROI_CADASTRAR) 
        delete result.id 
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR) 
    })

    it('Listar', async function(){
        const result = await context.read(MOCK_HEROI_CADASTRAR.nome)
        delete result.id
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR) 
    })

    // it('Deletar', async function(){
    //     const result = await context.delete(MOCK_DELETE_ID) 
    //     assert.deepEqual(result, true) 
    // })
})