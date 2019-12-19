const { obterPessoas } = require('./service') 

Array.prototype.meuReduce = function(callback, inicial){
    let valor = (inicial) ? inicial : 0 
    for(let i = 0; i <= this.length -1; i++){
        valor = callback(valor, this[i]) 
    }
    return valor 
}

async function main(){
    try{
        const pessoas = await obterPessoas('a') 
        const pesos = pessoas.results.map( pessoa => parseInt(pessoa.height))
        const total = pesos.meuReduce( function(anterior, atual) {return anterior + atual})
        console.log('pesos', pesos)
        console.log('total', total)
    }catch(erro){
        console.log('erro', erro)
    }
}

main() 