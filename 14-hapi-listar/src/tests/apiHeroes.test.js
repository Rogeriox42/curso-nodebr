const assert = require('assert')
const api = require('../api')

let app = {}
describe.only('Suíte de testes da API Heroes', function () {
    this.beforeAll(async () => {
        app = await api
    })

    it('Listar /herois', async () => {
        const result = await app.inject({
            method: 'GET', 
            url: '/herois?skip=0&limit=10'
        })
        const dados = JSON.parse(result.payload) 
        const statusCode = result.statusCode 

        // console.log('result', result) 
        // console.log('dados', dados) 

        assert.deepEqual(statusCode, 200) 
        assert.ok(Array.isArray(dados))
    })

    it('Listar /herois -> Deve listar apenas 10 herois', async () =>{
        const TAMANHO_LIMITE = 3 
        
        const result = await app.inject({
            method: 'GET', 
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`
        })

        const dados = JSON.parse(result.payload) 
        const statusCode = result.statusCode 

        console.log('dados.length', dados.length)

        assert.deepEqual(statusCode, 200) 
        assert.ok(dados.length === TAMANHO_LIMITE) 
    })

    it('Listar /herois -> Deve listar apenas 10 herois - erro do servidor', async () =>{
        const TAMANHO_LIMITE = 'a'
        
        const result = await app.inject({
            method: 'GET', 
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`
        })

        const dados = JSON.parse(result.payload) 
        const statusCode = result.statusCode 

        console.log('dados.length', dados.length)

        assert.deepEqual(statusCode, 500) 
    })

})