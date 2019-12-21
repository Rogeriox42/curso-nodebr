const assert = require('assert')
const { obterPessoas } = require('./service')
const nock = require('nock')

describe('Star Wars Tests', function () {

    this.beforeAll(() => {
        const response = {
            count: 1,
            next: null,
            previous: null,
            results: [
                {
                    name: 'Anakin Skywalker',
                    height: '188',
                    mass: '84',
                    hair_color: 'blond',
                    skin_color: 'fair',
                    eye_color: 'blue',
                    birth_year: '41.9BBY',
                    gender: 'male',
                    homeworld: 'https://swapi.co/api/planets/1/',
                    created: '2014-12-10T16:20:44.310000Z',
                    edited: '2014-12-20T21:17:50.327000Z',
                    url: 'https://swapi.co/api/people/11/'
                }
            ]
        }

        nock('https://swapi.co/api/people')
            .get('/?search=Anakin&format=json')
            .reply(200, response)
    })

    it('Deve buscar o Anakin no formato correto', async () => {

        const expected = [{
            nome: 'Anakin Skywalker', peso: 84
        }]

        const nomeBase = 'Anakin'
        const resultado = await obterPessoas(nomeBase)
        console.log('resultado', resultado)
        assert.deepEqual(expected, resultado)
    })
})