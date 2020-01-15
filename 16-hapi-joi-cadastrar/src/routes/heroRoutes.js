const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')

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
                validate: {
                    //     // headers --> Cabeçalhos 
                    //     // body --> payload 
                    //     // params --> URL:id 
                    //     // query --> skip, limit 
                    failAction: (request, headers, erro) => {
                        throw erro;
                    },
                    query: {
                        skip: Joi.number().default(0),
                        limit: Joi.number().integer().max(10).default(10),
                        nome: Joi.string().min(3).max(100)
                    }
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

                    return {
                        mensagem: 'Erro no servidor',
                        statusCode: 500
                    }
                }
            }
        }
    }

    create() {
        return {
            path: '/herois',
            method: 'POST',
            config: {
                validate: {
                    failAction: async (request, header, erro) => {
                        return erro
                    },
                    payload: {
                        nome: Joi.string().required().min(3).max(100),
                        poder: Joi.string().required().min(3).max(100)
                    }
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
                    return 'Erro interno'
                }
            }
        }
    }

    update() {
        return {
            method: 'PATCH',
            path: `/herois/{id}`,
            config: {
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
                    }
                }
            },
            handler: async (request) => {
                try {
                    const { id } = request.params

                    const { payload } = request

                    const dadosString = JSON.stringify(payload)
                    const dados = JSON.parse(dadosString)

                    const result = await this.db.update(id, dados)
                    // console.log('result', result)

                    if(result.nModified !== 1){
                        return{
                            message: 'Erro ao atualizar o eroi'
                        }
                    }

                    return{
                        message:'Heroi atualizado com sucesso!'
                    }

                    return {
                        message: 'Heroi atualizado com sucesso!'
                    }

                } catch (erro) {
                    console.log('erro ao atualizar')
                    return {
                        message: 'Erro interno do servidor'
                    }
                }
            }
        }
    }
}

module.exports = HeroRoutes 