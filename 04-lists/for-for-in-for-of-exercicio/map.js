const service = require('./service-2') 
const uuid = require('uuid/v1') 

Array.prototype.meuMap = (function(callback){
    list = [] 
    for(let i = 0; i < this.length; i++){
        const info = callback(this[i], i)
        starship = {
            id: uuid(), 
            info
        }
        list.push(starship)
    }
    return list 
})

async function main(){
    const response = await service.getStarships('e')
    const starships = response.results 

    const starshipsMapped = starships.meuMap( (starship, index) => {
        return `[${index}] = ${starship.name} | ${starship.manufacturer}`
    })

    console.log('starshipsMapped', starshipsMapped) 
}

main() 