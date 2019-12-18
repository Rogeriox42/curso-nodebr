const service = require('./service-2') 

async function main(){
    const starships = await service.getStarships('e')
    const list = [] 
    
    console.time('for')
    for(let i = 0; i < starships.results.length; i++){
        list.push(starships.results[i])
    }
    console.timeEnd('for')

    console.time('forin')
    for(let i in starships.results){
        list.push(starships.results[i])
    }
    console.timeEnd('forin')

    console.time('forof') 
    for(let starship of starships.results){
        list.push(starship) 
    }
    console.timeEnd('forof') 

    console.log('starships', starships)
}

main() 