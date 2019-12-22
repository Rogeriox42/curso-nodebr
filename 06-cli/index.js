const Commander = require('commander')
const Database = require('./database')

async function main(params) {
    Commander
        .version('v1')
        .option('-n, --nome [value]', "Nome do herói")
        .option('-p, --poder [value]', "Poder do herói")
        .option('-c, --cadastrar', "Cadastrar o herói") 
        .parse(process.argv)
    try {
        if(Commander.cadastrar){
            const { nome, poder } = Commander
            const heroi = {nome, poder}
            // console.log('heroi', heroi)
            const resultado = await Database.cadastrarHeroi(heroi) 
            const listar = await Database.listar() 
            console.log('resultado', resultado) 
            console.log('listar', listar) 
        }

    } catch (error) {
        console.error('ERROR', error)
    }
}

main() 