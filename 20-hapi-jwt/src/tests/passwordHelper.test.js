const assert = require('assert') 
const PasswordHelper = require('../helpers/PasswordHelper') 

const SENHA = 'Rogerio@32121' 

describe.only('UserHelper Test Suite', function(){
    it('Deve gerar um hash a partir de uma senha', async () =>{
        const result = await PasswordHelper.hashPassword(SENHA)
        console.log('result', result) 

        assert.ok(result.length > 10)
    })
})