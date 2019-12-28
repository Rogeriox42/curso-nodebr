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
        this.timeout(5000)
        await context.connect() 
    })
    
    it('Verificar conexão', async () =>{
        const res = await context.isConnected() 
        const expected = 'Conectado'
        assert.deepEqual(res, expected) 
    })
        
    it('Cadastrar', async () =>{
        const {nome, poder} = await context.create(MOCK_HEROI_CADASTRAR)
        assert.deepEqual({nome, poder}, MOCK_HEROI_CADASTRAR)
    })

    it('Listar', async () =>{
        const [{nome, poder}] = await context.read({nome: MOCK_HEROI_CADASTRAR.nome}, 0, 5)
        const result = {nome, poder}
        // console.log('result', result)
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR) 
    })

    it('Contar', async () =>{
        const result = await context.count() 
        const typeResult = typeof result 
        const expected = 'number'
        assert.deepEqual(typeResult, expected) 
    })
})