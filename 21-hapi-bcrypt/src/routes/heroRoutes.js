const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')
const Boom = require('boom') 

const headers = Joi.object({
    authorization: Joi.string().required()
}).unknown()

class HeroRoutes extends BaseRoute {
    constructor(db) {
        super()
        this.db = db
    }

    list() {
        return {
            path: '/herois',
            method: 'GET',
            config: {
                tags: ['api'],
                description: 'Deve listar herois', 
                notes: 'Pode paginar resultados e filtrar por nome',
                validate: {
                    //     // headers --> Cabeçalhos 
                    //     // body --> payload 
                    //     // params --> URL:id 
                    //     // query --> skip, limit 
                    headers, 
                    failAction: (request, headers, erro) => {
                        throw erro;
                    },
                    query: {
                        skip: Joi.number().default(0),
                        limit: Joi.number().integer().max(10).default(10),
                        nome: Joi.string().min(3).max(100)
                    },
                    headers
                },
            },
            handler: (request, headers) => {
                try {
                    const { skip, limit, nome } = request.query

                    // let query = nome ? {
                    //     nome: { $regex: `.*${nome}*.` }
                    // } : {}

                    let query = nome ? { nome } : {}

                    return this.db.read(query, parseInt(skip), parseInt(limit))
                }
                catch (error) {
                    console.log('DEU RUIM NA QUERY', error)

                    return Boom.internal()
                }
            }
        }
    }

    create() {
        return {
            path: '/herois',
            method: 'POST',
            config: {
                tags: ['api'],
                description: 'Deve cadastrar herois', 
                notes: 'Deve cadastrar heroi por nome e poder',
                validate: {
                    failAction: async (request, header, erro) => {
                        return erro
                    },
                    payload: {
                        nome: Joi.string().required().min(3).max(100),
                        poder: Joi.string().required().min(3).max(100)
                    },
                    headers
                },
            },
            handler: async (request) => {
                try {
                    const { nome, poder } = request.payload
                    const result = await this.db.create({ nome, poder })
                    return {
                        message: 'Heroi cadastrado com sucesso!',
                        _id: result._id
                    }
                } catch (erro) {
                    console.log('DEU RUIM', erro)
                    return Boom.internal()
                }
            }
        }
    }

    update() {
        return {
            method: 'PATCH',
            path: `/herois/{id}`,
            config: {
                tags: ['api'],
                description: 'Deve atualizar herois', 
                notes: 'Atualiza o heroi usando ID, nome e poder',
                validate: {
                    failAction: async (request, header, erro) => {
                        return erro
                    },
                    params: {
                        id: Joi.string().required()
                    },
                    payload: {
                        nome: Joi.string().min(3).max(100),
                        poder: Joi.string().min(3).max(100)
                    },
                    headers
                }
            },
            handler: async (request) => {
                try {
                    const { id } = request.params

                    const { payload } = request

                    const dadosString = JSON.stringify(payload)
                    const dados = JSON.parse(dadosString)

                    const result = await this.db.update(id, dados)

                    if(result.nModified !== 1){
                        return Boom.preconditionFailed('ID Não existente')
                    }

                    return{
                        message:'Heroi atualizado com sucesso!'
                    }

                } catch (erro) {
                    console.log('erro ao atualizar')
                    return Boom.internal()
                }
            }
        }
    }

    delete() {
        return {
            method: 'DELETE',
            path: '/herois/{id}',
            config: {
                tags: ['api'],
                description: 'Deve excluir um heroi', 
                notes: 'Exclui um heroi com base em seu ID',
                validate: {
                    failAction: (request, header, erro) => {
                        throw erro
                    },
                    params: {
                        id: Joi.string().required().max(100)
                    }, 
                    headers
                }
            },
            handler: async (request, header) => {
                try {
                    const {id} = request.params 
                    const result = await this.db.delete(id)
                    if(result.n !== 1){
                        return Boom.preconditionFailed('ID Não existente')
                    }
                    return {
                        message: 'Heroi excluido com sucesso!'
                    }   
                } catch (erro) {
                    return Boom.internal() 
                }
            }
        }
    }
}

module.exports = HeroRoutes 