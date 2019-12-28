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
        const result = await context.read({nome: MOCK_HEROI_ATUALIZAR.nome})
        delete result.id
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR) 
    })

    it.only('Atualizar', async function(){
        const item = await context.read({nome: MOCK_HEROI_ATUALIZAR.nome})
        const novoItem = {
            ... MOCK_HEROI_ATUALIZAR, 
            nome: 'Mulher Maravilha' 
        }
        const [result] = await context.update(item.id, novoItem)
        const itemAtualizado = await context.read({id: item.id}) 
    
        assert.deepEqual(result, 1) 
        assert.deepEqual(itemAtualizado.id, item.id) 
    })

    it('Deletar', async function(){
        const item = context.read() 
        const result = await context.delete(item.id) 
        assert.deepEqual(result, true) 
    })
})