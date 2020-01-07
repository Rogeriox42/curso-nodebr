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

                    console.log('limit', limit) 

                    if (isNaN(skip)) {
                        throw new Error('ERRO NO SKIP, DEVE SER UM NUMERO')
                    }
                    if (isNaN(limit)) {
                        throw new Error('ERRO NO LIMITE, DEVE SER UM NUMERO')
                    }

                    return this.db.read(query, parseInt(skip), parseInt(limit))
                }
                catch (error) {
                    console.log('DEU RUIM NA QUERY', error)
                    return 'Erro na String de Query'
                }
            }
        }
    }
}

module.exports = HeroRoutes 