const { obterPessoas } = require('./service')
const uuid = require('uuid/v1') 

Array.prototype.meuFilter = (function(callback){
    const list = [] 
    for(item of this){
        const res = callback(item) 
        if(!res) continue; 
        const newItem = {
            id: uuid(), 
            info: item 
        }
        list.push(newItem) 
    }
    return list 
})

async function main(){

    try{
        const {results} =  await obterPessoas('a') 
        const familia = results.meuFilter( item => item.name.toLowerCase().indexOf('skywalker')!==1)
        const names = familia.map( (person) =>`${person.info.name} - ${person.info.birth_year} - ${person.id}`)
        console.log('names', names) 
    }catch(error){
        console.log('error', error) 
    }

}

main() 


/* 
1 - Destructuring 

2 - Filter recebe uma função 
2.1 - Essa função deve retornar um booleano 
2.2 - Para manter na lista = true 
2.3 - Para remover da lista = false 

*/