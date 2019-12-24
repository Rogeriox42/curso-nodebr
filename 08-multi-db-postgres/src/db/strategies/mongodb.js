const ICrud = require('./interface/InterfaceCrud')

class MongoDB extends ICrud{
    constructor(){
        super() 
    }

    create(item){
        console.log(`O item ${JSON.stringify(item)} foi salvo em MongoDB`) 
    }
}

module.exports = MongoDB 