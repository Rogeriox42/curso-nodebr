
// const Hapi = require('@hapi/hapi')
// npm install hapi-auth-jwt2
const Hapi = require('hapi')
const Mongodb = require('./db/strategies/mongodb/mongodb')
const Context = require('./db/strategies/base/ContextStrategy')
const heroiSchema = require('./db/strategies/mongodb/schemas/heroiSchema')
const HeroRoute = require('../src/routes/heroRoutes')
const HapiSwagger = require('hapi-swagger') 
const Vision = require('@hapi/vision') 
const Inert = require('@hapi/inert') 
const AuthRoute = require('../src/routes/authRoutes')

const HapiJwt = require('hapi-auth-jwt2')
const JWT_SECRET = 'MY_SUPER_SECRET_123'

const app = new Hapi.Server({
    port: 5000
})

function mapRoutes(instance, methods) {
    return methods.map(method => instance[method]())
}

async function main() {
    const connection = Mongodb.connect()
    const context = new Context(new Mongodb(connection, heroiSchema))
    
    const swaggerOptions = {
        info: {
            title: 'API Herois', 
            version: 'v1.0'
        }, 
        lang: 'pt'
    }
    
    await app.register([
        HapiJwt, 
        Vision, 
        Inert, 
        {
            plugin: HapiSwagger, 
            options: swaggerOptions
        }
    ])

    app.auth.strategy('jwt', 'jwt', {
        key: JWT_SECRET,
        // options: {
        //     expiresIn: 20
        // }
        validate: (dado, request) =>{
            //Verifica no banco se usuário continua ativo 
            //Verifica no banco se usuário continua pagando 


            return{
                isValid: true
            }
        }
    })

    app.auth.default('jwt') 

    console.log('mapRoutes', mapRoutes(new HeroRoute(context), HeroRoute.methods()))
    app.route([
        ... mapRoutes(new HeroRoute(context), HeroRoute.methods()),
        ... mapRoutes(new AuthRoute(JWT_SECRET), AuthRoute.methods()),
    ])

    await app.start()
    console.log('App rodando na porta ', app.info.port)

    return app
}


module.exports = main() 