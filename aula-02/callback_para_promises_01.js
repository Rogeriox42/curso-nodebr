/* 
    Obter um usuário 
    obter o núemro de telefone de um usuário a partir de seu ID
    Obter o endereço do usuário pelo ID 
*/

// Importamos o módulo interno do NodeJS 

const util = require('util')
obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario() {
    // Quando houver erros, retorna reject(ERRO)
    // Quando for sucesso, retorna resolve 

    return new Promise(function resolvePromise(resolve, reject) {
        //return reject(new Error('DEU RUIM DEMAIS'))

        setTimeout(function () {
            return resolve({
                id: 1,
                nome: 'Aladin',
                dataNascimento: new Date()
            })
        }, 1000)
    })

}

function obterTelefone(idUsuario, callback) {
    return new Promise(function resolveTelefone(resolve, reject) {
        setTimeout(() => {
            return resolve({
                numero: '1234-5436',
                ddd: '11'
            })
        }, 2000)
    })
}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: 'Rua dos bobos',
            numero: 0
        })
    }, 2000)
}

const usuarioPromise = obterUsuario()
usuarioPromise
    .then((usuario) => {
        return obterTelefone(usuario.id)
            .then(function resolveTelefone(result) {
                return {
                    usuario: {
                        id: usuario.id,
                        nome: usuario.nome,
                    }, 
                    telefone: result
                }
            }).then(function (resultado) {
                const endereco = obterEnderecoAsync(resultado.usuario.id)
                return endereco.then(function resolverEndereco(result) {
                    return {
                        usuario: resultado.usuario,
                        telefone: resultado.telefone,
                        endereco: result
                    }
                })
            })
    })
    .then((resultado) => {
        console.log(`
            ID: ${resultado.usuario.id}    
            Nome: ${resultado.usuario.nome}
            Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.numero} 
            Endereço: ${resultado.endereco.rua}, Nº: ${resultado.endereco.numero} 
        `)
    })
    .catch((err) => {
        console.log('DEU RUIM ' + err)
    })


/* */
/* const telefonePromise = obterTelefone()
    .then( (result) =>{
        console.log('telefone', result)
    })
    .catch( (err) =>{
        console.log('erro no telefone', err)
    }) */




// Função com Callback 

/* obterUsuario(function resUsuario(error, usuario) {
    if (error) {
        console.error('DEU RUIM em USUARIO', error)
        return;
    }

    obterTelefone(usuario.id, function resTelefone(error1, telefone) {
        if (error1) {
            console.error('DEU RUIM em TELEFONE', error1)
            return;
        }

        obterEndereco(usuario.id, function resEndereco(error2, endereco){
            if(error2){
                console.log('ERRO NO ENDEREÇO', error2)
            }

            console.log(`
                Nome: ${usuario.nome},
                Endereço: ${endereco.rua}, ${endereco.numero},
                Telefone: (${telefone.ddd})${telefone.numero}
            `)
        })
    })
}) */