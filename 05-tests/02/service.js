const { get } = require('axios') 
const baseURl = 'https://swapi.co/api/'

async function getStarships(name){
    const url = `${baseURl}starships/?search=${name}&format=json`
    const response = await get(url) 
    return response.data.results.map(formatStarship) 
    // return response.data
}

function formatStarship(item){
    return {
        name: item.name, 
        crew: item.crew, 
        hyperdrive: item.hyperdrive_rating 
    }
}

module.exports = {getStarships}