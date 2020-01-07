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



                    return this.db.read(nome, skip, limit)
                } catch (error) {
                    console.log('DEU RUIM', error)
                    return 'Erro Interno no Servidor'
                }
            }
        }
    }
}

module.exports = HeroRoutes 