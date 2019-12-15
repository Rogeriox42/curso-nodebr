const axios = require('axios')
const baseURL = 'https://swapi.co/api'

async function getPeople(name) {
    const url = `${baseURL}/people/?search=${name}&format=json`
    const response = await axios.get(url)
    return response.data
}

getPeople('anakin')
    .then((result) => {
        console.log('result', result)
    })
    .catch((error) => {
        console.log('error', error)
    })