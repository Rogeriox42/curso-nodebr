const { obterPessoas } = require('./service')

async function main(){

    try{
        const {results} =  await obterPessoas('a') 
        // const familiaSkywalker = results.filter(function(item){
        //     const result = item.name.toLowerCase().indexOf('skywalker') !== -1
        //     return result 
        // })
        const familiaSkywalker = results.filter( (item) =>  (item.name.toLowerCase().indexOf('skywalker') !== -1) )
        const names = familiaSkywalker.map( (person) =>`${person.name} - ${person.birth_year}`)
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