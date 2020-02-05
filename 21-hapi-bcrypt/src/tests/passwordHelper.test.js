const assert = require('assert') 
const PasswordHelper = require('../helpers/PasswordHelper') 

const password = 'Rogerio@123123'
const hashPassword = '$2a$04$lQitPGrSw5V6nJDGomrARe/9XIQY2adygdueFb.qWO/9zrR/77t8e'

describe.only('UserHelper Test Suite', () =>{
    it('Password Hash test', async () =>{
        const result =  await PasswordHelper.hashPassword(password) 
        console.log('result', result) 

        assert.ok(result.length > 10)
    })

    it('Password Compare test', async () =>{
        const result = await PasswordHelper.comparePassword(password, hashPassword) 
        assert.deepEqual(result, true) 
    })
})