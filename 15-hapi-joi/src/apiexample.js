
const Hapi = require('hapi') 

const Mongodb = require('./db/strategies/mongodb/mongodb') 
const Context = require('./db/strategies/base/ContextStrategy') 
const heroiSchema = require('./db/strategies/mongodb/schemas/heroiSchema') 

const app = new Hapi.Server({
    port: 5000
}) 


async function main(){
    const connection = Mongodb.connect() 
    const context = new Context(new Mongodb(connection, heroiSchema))

    app.route([
        {
            path: '/herois', 
            method: 'GET', 
            handler: (request, headers) =>{
                return context.read() 
            }
        }
    ])

    await app.start() 
    console.log('App rodando na porta ', app.info.port) 
}


main() 