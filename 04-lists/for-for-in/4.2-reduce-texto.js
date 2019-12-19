Array.prototype.meuReduceTexto = function (callback, inicial) {
    let texto = (inicial) ? inicial : this[0]
    for (let i = 0; i < this.length; i++) {
        texto = callback(texto, this[i])
    }
    return texto 
}


async function main() {
    try {
        const arr = [
            ['Rogerio', 'Rodrigues'],
            ['São Paulo', 'Rio de Janeiro', 'Brasília']
        ]

        const newArr = arr.meuReduceTexto(function (anterior, proximo) {
            return anterior.concat(proximo)
        }, []).join(', ')

        console.log(newArr)
    } catch (err) {
        console.log('err', err)
    }
}

main() 