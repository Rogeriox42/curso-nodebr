/* 
    Buscar um filme 
    Buscar um cinema 
    Buscar uma sessão 
*/ 

function obterFilme(callback){
    setTimeout(() => {
        return callback(null, {
            nome: 'Matrix', 
            genero: 'Ação', 
            dataLancamento: '05/05/2020'
        })
    }, 1000) 
}

function obterCinema(callback){
    setTimeout( () =>{
        return callback(null,  {
            nome: 'Cinemark', 
            endereco: 'Rua das Nações Unidas 14004'
        })
    }, 1500)
}

function obterSessao(callback){
    setTimeout( () =>{
        return callback(null, {
            sala: 15, 
            valor: 20.5
        })
    }, 2000)
}



obterFilme(function resolveFilme(err, filme){
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
}) 