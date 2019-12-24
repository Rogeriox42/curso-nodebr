const ICrud = require('./interface/InterfaceCrud')

class Postgres extends ICrud{
    constructor(){
        super() 
    }

    create(item){
        console.log(`O item ${JSON.stringify(item)} foi salvo em Postgres`) 
    }
}

module.exports = Postgres