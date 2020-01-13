const BaseRoute = require('./base/baseRoute')

class HeroRoutes extends BaseRoute {
    constructor(db) {
        super()
        this.db = db
    }

    list() {
        return {
            path: '/herois',
            method: 'GET',
            handler: (request, headers) => {
                try {
                    const { skip, limit, nome } = request.query

                    let query = {}
                    if (nome) {
                        query.nome = nome
                    }

                    if (isNaN(skip)){
                        throw Error('O skip é inválido') 
                    }

                    if(isNaN(limit)){   
                        throw Error('O limit  é inválido') 
                    }

                    return this.db.read(query, parseInt(skip), parseInt(limit))
                }
                catch (error) {
                    console.log('DEU RUIM NA QUERY', error)
                    
                    return {
                        mensagem: 'Erro no servidor', 
                        statusCode: 500
                    }
                }
            }
        }
    }
}

module.exports = HeroRoutes 