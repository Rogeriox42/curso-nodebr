const EventEmitter = require('events').EventEmitter
class MeuEmissor extends EventEmitter {

}

const meuEmissor = new MeuEmissor()
const meuEvento = 'user:click'

meuEmissor.addListener(meuEvento, function (local) {
    console.log('usuario clicou no local: ' + local)
})

let count = 0

setInterval(function () {
    meuEmissor.emit(meuEvento, 'barra de endereço ' + count)
    count++
}, 1000)

setInterval(function () {
    meuEmissor.emit(meuEvento, 'texto ' + count)
    count++
}, 1400)

