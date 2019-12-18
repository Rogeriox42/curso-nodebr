const service = require('./service-test')

async function main() {
    try {
        names = []

        const response = await service.getStarships('e')

        console.time('for')
        for(let i = 0; i < response.results.length - 1; i++){
            const starship = response.results[i]
            names.push(starship.name) 
        }
        console.timeEnd('for')

        console.time('forin')
        for(let i in response.results){
            const starship = response.results[i] 
            names.push(starship.name) 
        }
        console.timeEnd('forin')

        console.time('forof')
        for(res of response.results){
            names.push(res.name) 
        }
        console.timeEnd('forof')

        console.log('names', names) 
    } catch (error) {
        console.log('ERROR', error)
    }
}

main() 