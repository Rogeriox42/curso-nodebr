/* 
    Buscar um filme 
    Buscar um cinema 
    Buscar uma sessão 
*/

const util = require('util')
const obterSessaoAsync = util.promisify(obterSessao)

function obterFilme() {
    return new Promise(function resolverFilme(resolve, reject) {
        setTimeout(() => {
            return resolve({
                nome: 'Matrix',
                genero: 'Ação',
                dataLancamento: '05/05/2020'
            })
        }, 1000)
    })
}

function obterCinema() {
    return new Promise(function resCinema(resolve, reject){
        setTimeout(() => {
            return resolve({
                nome: 'Cinemark',
                endereco: 'Rua das Nações Unidas 14004'
            })
        }, 1500)
    })
}

function obterSessao(callback) {
    setTimeout(() => {
        return callback(null, {
            sala: 15,
            valor: 20.5
        })
    }, 2000)
}

const filmePromise = obterFilme()
filmePromise
    .then(function resFilme(filme) {
        return{
            dados: {
                filme: filme
            }
        }
    }).then(function resDados(resultado){
        return obterCinema().then((result) => {
            return {
                dados: {
                    filme: resultado.dados.filme, 
                    cinema: result
                }
            }
        }).then( (resultado) =>{
            return obterSessaoAsync().then( (result) =>{
                return{
                    dados: {
                        filme: resultado.dados.filme, 
                        cinema: resultado.dados.cinema, 
                        sessao: result 
                    }
                }
            })
        })
    }).then( (result) =>{
        console.log(`
            Filme: ${result.dados.filme.nome}
            Cinema: ${result.dados.cinema.nome}
            Endereço: ${result.dados.cinema.endereco}
            Sala: ${result.dados.sessao.sala}
            Valor: ${result.dados.sessao.valor}
        `)
    })


/* obterFilme(function resolveFilme(err, filme){
    if(err){
        console.log('ERRO AO BUSCAR FILME ', err)
    }

    obterCinema(function resolverCinema(err2, cinema){
        if(err){
            console.log('ERRO AO BUSCAR CINEMA ', err2)
        }

        obterSessao(function resolverSessao(err3, sessao){
            if(err3){
                console.log('ERRO AO BUSCAR SESSAO ', err3)
            }

            console.log(filme, cinema, sessao)
        })
    })
})  */