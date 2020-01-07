
const Hapi = require('hapi')

const Mongodb = require('./db/strategies/mongodb/mongodb')
const Context = require('./db/strategies/base/ContextStrategy')
const heroiSchema = require('./db/strategies/mongodb/schemas/heroiSchema')
const HeroRoute = require('../src/routes/heroRoutes')

const app = new Hapi.Server({
    port: 5000
})

function mapRoutes(instance, methods) {
    return methods.map(method => instance[method]())
}

async function main() {
    const connection = Mongodb.connect()
    const context = new Context(new Mongodb(connection, heroiSchema))


    console.log('mapRoutes', mapRoutes(new HeroRoute(context), HeroRoute.methods()))
    app.route([
        ... mapRoutes(new HeroRoute(context), HeroRoute.methods())
    ])

    await app.start()
    console.log('App rodando na porta ', app.info.port)

    return app
}


module.exports = main() 