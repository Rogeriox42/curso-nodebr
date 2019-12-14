/* 
    Obter um usuário 
    obter o núemro de telefone de um usuário a partir de seu ID
    Obter o endereço do usuário pelo ID 
*/

function obterUsuario(callback) {
    setTimeout(function () {
        return callback(null,
            {
                id: 1,
                nome: 'Aladin',
                dataNascimento: new Date()
            })
    }, 1000)
}

function obterTelefone(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            numero: '1234-5436',
            ddd: '11'
        })
    }, 2000)
}

function resolverUsuario(err, usuario) {
    console.log('usuario', usuario)
}

function obterEndereco(idUsuario, callback) {
    setTimeout( () =>{
        return callback(null, {
            rua: 'Rua dos bobos', 
            numero: 0
        })
    }, 2000)
}

obterUsuario(function resUsuario(error, usuario) {
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

})



const usuario = obterUsuario(resolverUsuario)
console.log(usuario)


//const usuario = obterUsuario()
//const telefone = obterTelefone(usuario.id)

//console.log('usuario', usuario)
//console.log('telefone', telefone) 