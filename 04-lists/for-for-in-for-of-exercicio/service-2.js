const axios = require('axios')
const baseURL = 'https://swapi.co/api'

async function getStarships(name) {
    const url = `${baseURL}/starships/?search=${name}&format=json`
    const response = await axios.get(url)
    return response.data
}

module.exports = {
    getStarships 
}