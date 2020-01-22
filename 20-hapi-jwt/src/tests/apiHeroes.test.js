const assert = require('assert')
const api = require('../api')

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkpvaG4gSm9uZXMiLCJpZCI6MSwiaWF0IjoxNTc5NzIwNDE1fQ.OaJ_goyJaBB-htnr1NJScK-kJUy4meShs7hN6bpM9m4MiLCJpZCI6MSwiaWF0IjoxNTc5NzIwNDE1fQ.OaJ_goyJaBB-htnr1NJScK-kJUy4meShs7hN6bpM9m4'

const MOCK_HEROI_CADASTRAR = {
    nome: 'Chapolim Colorado',
    poder: 'Marreta Biônica'
}

const MOCK_HEROI_INICIAL = {
    nome: 'Gavião Negro',
    poder: 'Flechas'
}

const headers = {
    Authorization: TOKEN
}

let MOCK_ID

let app = {}
describe('Suíte de testes da API Heroes', function () {
    this.beforeAll(async () => {
        app = await api
        const result = await app.inject({
            method: 'POST',
            url: '/herois',
            headers, 
            payload: MOCK_HEROI_INICIAL
            // payload: JSON.stringify(MOCK_HEROI_INICIAL)
        })
        const dados = JSON.parse(result.payload)
        MOCK_ID = dados._id
    })

    it('Listar /herois', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/herois?skip=0&limit=10', 
            headers 
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
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`,
            headers 
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
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}&nome=${nome}`,
            headers, 
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
            url: `/herois`,
            payload: MOCK_HEROI_CADASTRAR
        })

        const statusCode = result.statusCode
        const { message, _id } = JSON.parse(result.payload)

        assert.deepEqual(statusCode, 200)
        assert.deepEqual(message, 'Heroi cadastrado com sucesso!')
        assert.notStrictEqual(_id, undefined)
    })

    it('Atualizar herói PATCH /heroi:id ', async () => {
        const _id = MOCK_ID
        const expected = {
            poder: 'Supermira'
        }

        const result = await app.inject({
            method: 'PATCH',
            url: `/herois/${_id}`,
            payload: JSON.stringify(expected)
        })

        // const dados = result.payload
        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        assert.deepEqual(statusCode, 200)
        assert.deepEqual(dados.message, 'Heroi atualizado com sucesso!')
    })

    it('Atualizar herói PATCH /heroi:id - Não deve atualizar com ID incorreto ', async () => {
        const _id = `5e1e88750a2d0cc2f2dbabc3`
        
        const expected = {
            statusCode: 412,
            error: 'Precondition Failed',
            message: 'ID Não existente'
        }

        const result = await app.inject({
            method: 'PATCH',
            url: `/herois/${_id}`,
            payload: {poder: 'Superforça'}
        })


        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        assert.deepEqual(dados.statusCode, 412)
        assert.deepEqual(dados, expected)
    })

    it('Remover DELETE - /heroid/:id', async () => {
        const _id = MOCK_ID

        const result = await app.inject({
            method: 'DELETE',
            url: `/herois/${_id}`
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        assert.deepEqual(statusCode, 200)
        assert.deepEqual(dados.message, 'Heroi excluido com sucesso!')
    })

    it('Remover DELETE - /heroid/:id - ID Não existente', async () => {
        const _id = `5e1e88750a2d0cc2f2dbabc3`
        
        const expected = {
            statusCode: 412,
            error: 'Precondition Failed',
            message: 'ID Não existente'
        }

        const result = await app.inject({
            method: 'DELETE',
            url: `/herois/${_id}`
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        assert.deepEqual(dados.statusCode, 412)
        assert.deepEqual(dados, expected)
    })

    it('Remover DELETE - /heroid/:id - ID Inválido - Exceção no Servidor', async () => {
        const _id = `Batata`
        
        const expected = {
            statusCode: 500,
            error: 'Internal Server Error',
            message: 'An internal server error occurred'
          }

        const result = await app.inject({
            method: 'DELETE',
            url: `/herois/${_id}`
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        // console.log('dados', dados)

        assert.deepEqual(dados.statusCode, 500)
        assert.deepEqual(dados, expected)
    })
})