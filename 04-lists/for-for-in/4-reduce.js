const { obterPessoas } = require('./service')

Array.prototype.meuReduce = function(callback, inicial){
    let final = typeof inicial !== undefined ? inicial : this[0]
    for(let i = 0; i < this.length; i++){
        final = callback(final, this[i], this) 
    }
    return final 
}

async function main(){
    try{
        const { results } = await obterPessoas('a') 
        const pesos = results.map( item => parseInt(item.height)) 
        console.log('pesos', pesos) 
        const total = pesos.meuReduce( (anterior, proximo) =>{
            return anterior + proximo  
        }, 0)
        console.log('total', total)
    }catch(error){
        console.log('error', error) 
    }
}

main() 
