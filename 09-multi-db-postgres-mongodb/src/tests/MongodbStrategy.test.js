const assert = require('assert') 
const Mongodb = require('../db/strategies/mongodb') 
const Context = require('../db/strategies/base/ContextStrategy') 
const MOCK_HEROI_CADASTRAR = {
    nome: 'Mulher Maravilha', 
    poder: 'Laço' 
}

const MOCK_HEROI_ATUALIZAR = {
    nome: `Patolino-${Date.now()}`, 
    poder: 'Velocidade' 
}

let MOCK_HEROI_ID = ''

const context = new Context(new Mongodb()) 

describe('Mongodb Suite de Tests', function(){
    this.beforeAll( async function(){
        this.timeout(5000)        
        await context.connect() 
        const result = await context.create(MOCK_HEROI_ATUALIZAR) 
        MOCK_HEROI_ID = result._id 
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

    it('Atualizar', async () =>{
        const result = await context.update(MOCK_HEROI_ID, {
            nome: 'Pernalonga' 
        })

        assert.deepEqual(result.nModified, 1) 
    })

    it('Contar', async () =>{
        const result = await context.count() 
        const typeResult = typeof result 
        const expected = 'number'
        assert.deepEqual(typeResult, expected) 
    })
})