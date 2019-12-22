const Commander = require('commander')
const Database = require('./database')
const Heroi = require('./Heroi')

async function main(params) {
    Commander
        .version('v1')
        .option('-n, --nome [value]', "Nome do herói")
        .option('-p, --poder [value]', "Poder do herói")
        .option('-id, --id [value]', 'ID do herói') 
        .option('-c, --cadastrar', "Cadastrar o herói") 
        .option('-l, --listar', "Listar Heroís") 
        .option('-a, --atualizar', 'Atualizar Herói') 
        .option('-r, --remover', 'Deletar herói') 
        .parse(process.argv)

        const heroi = new Heroi(Commander) 
    try {
        if(Commander.cadastrar){            
            console.log('heroi', heroi)
            const resultado = await Database.cadastrarHeroi(heroi) 
            if(!resultado){
                console.error('Erro ao cadastrar o herói') 
                return; 
            }
            console.log(`O herói ${heroi.nome} foi cadastrado com sucesso!`)
        }

        if(Commander.listar){
            const dados = await Database.listar() 
            const dadosMapeados = dados.map( item => console.log(`ID: ${item.id} | Nome: ${item.nome} | Poder: ${item.poder} `))
            // console.log('Lista de Heróis: \n', dadosMapeados)
        }

        if(Commander.remover){
            const resultado = await Database.remover(heroi.id)
            if(!resultado){
                console.log('Erro ao remover o herói!')
                return; 
            }
            console.log('Herói deletado com sucesso!') 
        }

        if(Commander.atualizar){
            const resultado = await Database.atualizar(heroi.id, heroi)
            if(!resultado){
                console.log('Erro ao atualizar o herói!')
                return; 
            }
            console.log('Herói atualizado com sucesso!') 
        }


    } catch (error) {
        console.error('ERROR', error)
    }
}

main() 