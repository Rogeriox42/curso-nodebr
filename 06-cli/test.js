const { deepEqual, ok } = require('assert')

const database = require('./database')

const DEFAULT_HEROI_CADASTRAR = {
    nome: 'Flash',
    Poder: 'Velocidade',
    id: 1
}

const DEFAULT_ITEM_ATUALIZAR = {
    nome: 'Lanterna Verde', 
    poder: 'Energia do Anel', 
    id: 2
}

describe('Suíte de testes de heróis', () => {
    before(async () => {
        await database.cadastrarHeroi(DEFAULT_HEROI_CADASTRAR)
        await database.cadastrarHeroi(DEFAULT_ITEM_ATUALIZAR)
    })

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

    it('Deve atualizar um herói pelo ID', async () =>{
        const expected = {
            ... DEFAULT_ITEM_ATUALIZAR, 
            nome: 'Lanterna Verde', 
            poder: 'Energia do Anel'
        }
        const novoDado = {
            nome: 'Batman', 
            poder: 'Dinheiro'
        }

        await database.atualizar(DEFAULT_ITEM_ATUALIZAR.id, novoDado)
        const resultado = await database.listar(DEFAULT_ITEM_ATUALIZAR.id)
        deepEqual(resultado, expected) 
    })

})