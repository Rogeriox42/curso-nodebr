const assert = require('assert')
const api = require('../api')

const MOCK_HEROI_CADASTRAR = {
    nome: 'Chapolim Colorado', 
    poder: 'Marreta Biônica' 
}

let app = {}
describe('Suíte de testes da API Heroes', function () {
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

        assert.deepEqual(statusCode, 200)
        assert.ok(Array.isArray(dados))
    })

    it('Listar /herois -> Deve listar apenas 3 herois', async () => {
        const TAMANHO_LIMITE = 3

        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`
        })

        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode

        // console.log('dados', dados)

        assert.deepEqual(statusCode, 200)
        assert.ok(dados.length === TAMANHO_LIMITE)
    })

    it('Listar /herois -> Deve Filtrar 1 item', async () => {
        const TAMANHO_LIMITE = 3
        const nome = 'Flash'

        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}&nome=${nome}`
        })

        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode

        // console.log('dados.length', dados.length)

        assert.deepEqual(statusCode, 200)
        assert.ok(dados[0].nome === nome)
        // assert.ok(dados.length === TAMANHO_LIMITE) 
    })

    it('Listar /herois -> Deve listar apenas 10 herois - erro do servidor', async () => {
        const TAMANHO_LIMITE = 'a'

        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`
        })

        const dados = JSON.parse(result.payload)
        const statusCode = dados.statusCode

        const expectedError = {
            statusCode: 400,
            error: 'Bad Request',
            message: 'child "limit" fails because ["limit" must be a number]',
            validation: { source: 'query', keys: ['limit'] }
        }

        assert.deepEqual(dados.statusCode, 400)
        assert.deepEqual(dados, expectedError)
    })

    it('Cadastrar heroi POST - ', async () => {
        const result = await app.inject({
            method: 'POST',
            url: `/herois`
        })


    })

})