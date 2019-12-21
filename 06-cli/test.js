const { deepEqual, ok } = require('assert')

const database = require('./database')

const DEFAULT_HEROI_CADASTRAR = {
    nome: 'Flash',
    Poder: 'Velocidade',
    id: 1
}
describe('Suíte de testes de heróis', () => {
    // before(async () => {
    //     await database.cadastrarHeroi(DEFAULT_HEROI_CADASTRAR)
    // })

    it('Deve pesquisar um heroi', async () => {
        const expected = DEFAULT_HEROI_CADASTRAR
        const [resultado] = await database.listar(expected.id)

        deepEqual(resultado, expected)
    })



    it('Deve cadastrar um herói', async () => {
        const expected = DEFAULT_HEROI_CADASTRAR
        const resultado = await database.cadastrarHeroi(DEFAULT_HEROI_CADASTRAR)
        const [novoHeroi] = await database.listar(DEFAULT_HEROI_CADASTRAR.id)

        deepEqual(novoHeroi, expected)
    })

    it('deve remover um herói', async () =>{
        const expected = true 
        const resultado = await database.remover(DEFAULT_HEROI_CADASTRAR.id) 
        deepEqual(resultado, expected) 
    })

})