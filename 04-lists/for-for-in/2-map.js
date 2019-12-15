const service = require('./service') 

Array.prototype.meuMap = (function(callback){
    const names = [] 
    for(indice = 0; indice < this.length; indice++){
        const name = callback(this[indice], indice)
        names.push(name) 
    }
    return names 
})

async function main(){
    try{
        const response = await service.obterPessoas('a') 
        
        // const names = [] 
        // response.results.forEach(function(item){
        //     names.push(item.name)
        // })

        // const names = response.results.map(function(item){
        //     return item.name 
        // })
        
        // const names = response.results.map( item => item.name) 

        const names = response.results.meuMap(function (pessoa, indice){
            return `[${indice}]: ${pessoa.name}`
        })

        console.log('names', names)
    }catch(error){
        console.error('ERRO INTERNO', error)
    }
}

main() 