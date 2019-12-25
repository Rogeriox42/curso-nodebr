const assert = require('assert') 
const Postgres = require('../db/strategies/postgres')

const Context = require('../db/strategies/base/ContextStrategy') 

const context = new Context(new Postgres()) 
const MOCK_HEROI_CADASTRAR = {nome: 'Hal Jordan', poder: 'Green Ring'}
const MOCK_HEROI_ATUALIZAR = {nome: 'Ironman', poder: 'Dinheiro'} 
const MOCK_DELETE_ID = 13

describe('Postgres Strategy', function(){
    this.timeout(50000)
    this.beforeAll( async () =>{
        await context.create(MOCK_HEROI_ATUALIZAR)
    })
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

    it.only('Atualizar', async function(){
        const newData = {nome: 'Batman', poder: 'Dinheiro'}
        const item = await context.read(MOCK_HEROI_ATUALIZAR.nome) 
        console.log('item', item) 
        
        expected = {
            nome: item.nome, 
            update: {... newData}
        }

        console.log('expected', expected)

        const result = await context.update(MOCK_HEROI_ATUALIZAR.nome, newData)
        
        assert.deepEqual(result, expected) 
    })

    // it('Deletar', async function(){
    //     const result = await context.delete(MOCK_DELETE_ID) 
    //     assert.deepEqual(result, true) 
    // })
})