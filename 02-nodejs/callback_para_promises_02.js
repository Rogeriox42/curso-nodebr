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
    return new Promise(function resCinema(resolve, reject) {
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

main() 
async function main(){
    try{
        console.time('medida-promise') 
        const filme = await obterFilme() 
        const resultado = await Promise.all([
            obterCinema(), 
            obterSessaoAsync() 
        ])
        
        const cinema = resultado[0] 
        const sessao = resultado[1] 

        console.log(`
        Filme: ${filme.nome}
        Cinema: ${cinema.nome}
        Endereço: ${cinema.endereco}
        Sala: ${sessao.sala}
        Valor: ${sessao.valor}
    `)
    console.timeEnd('medida-promise') 
    }catch(error){
        console.log('error', error)
    }
}

/* 
const filmePromise = obterFilme()
filmePromise
    .then(function resFilme(filme) {
        return {
            dados: {
                filme: filme
            }
        }
    }).then(function resDados(resultado) {
        return obterCinema().then((result) => {
            return {
                dados: {
                    filme: resultado.dados.filme,
                    cinema: result
                }
            }
        }).then((resultado) => {
            return obterSessaoAsync().then((result) => {
                return {
                    dados: {
                        filme: resultado.dados.filme,
                        cinema: resultado.dados.cinema,
                        sessao: result
                    }
                }
            })
        })
    }).then((result) => {
        console.log(`
            Filme: ${result.dados.filme.nome}
            Cinema: ${result.dados.cinema.nome}
            Endereço: ${result.dados.cinema.endereco}
            Sala: ${result.dados.sessao.sala}
            Valor: ${result.dados.sessao.valor}
        `)
    })
 */