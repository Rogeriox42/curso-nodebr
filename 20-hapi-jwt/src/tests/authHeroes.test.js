const assert = require('assert')
const api = require('../api')
let app = {}
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkpvaG4gSm9uZXMiLCJpZCI6MSwiaWF0IjoxNTc5NzIwNDE1fQ.OaJ_goyJaBB-htnr1NJScK-kJUy4meShs7hN6bpM9m4MiLCJpZCI6MSwiaWF0IjoxNTc5NzIwNDE1fQ.OaJ_goyJaBB-htnr1NJScK-kJUy4meShs7hN6bpM9m4'

describe('Auth test suite', function () {
    this.beforeAll(async () => {
        app = await api
    })

    it('deve obter um token', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: {
                username: 'John Jones',
                password: '123'
            }
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)
        // console.log('statusCode', statusCode)
        // console.log('dados', dados)

        assert.deepEqual(statusCode, 200)
        assert.ok(dados.token.length > 10)
    })

})