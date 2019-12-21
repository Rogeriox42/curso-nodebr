const axios = require('axios')
const baseURL = 'https://swapi.co/api'

async function obterPessoas(nome) {
    const url = `${baseURL}/people/?search=${nome}&format=json`
    const response = await axios.get(url)
    return response.data.results.map(formatarPessoa)
}

function formatarPessoa(item){
    const pessoaFormatada = {
        nome : item.name,
        peso : item.mass 
    }
    return pessoaFormatada 
}

module.exports = {obterPessoas}