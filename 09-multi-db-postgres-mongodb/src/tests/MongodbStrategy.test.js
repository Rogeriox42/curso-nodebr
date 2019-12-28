const assert = require('assert') 
const Mongodb = require('../db/strategies/mongodb') 
const Context = require('../db/strategies/base/ContextStrategy') 
const MOCK_HEROI_CADASTRAR = {
    nome: 'Mulher Maravilha', 
    poder: 'Laço' 
}
const context = new Context(new Mongodb()) 

describe('Mongodb Suite de Tests', function(){
    this.beforeAll( async function(){
        await context.connect() 
    })
    
    it('Verificar conexão', async () =>{
        const res = await context.isConnected() 
        const expected = 'Conectado'
        assert.deepEqual(res, expected) 
    })

    it.only('Cadastrar', async () =>{
        const {nome, poder} = await context.create(MOCK_HEROI_CADASTRAR)
        assert.deepEqual({nome, poder}, MOCK_HEROI_CADASTRAR)

    })
})