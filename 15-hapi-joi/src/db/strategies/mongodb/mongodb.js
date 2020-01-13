const ICrud = require('../interface/InterfaceCrud')
const Mongoose = require('mongoose')
const Schema = Mongoose.Schema
const heroiSchema = require('../../../db/strategies/mongodb/schemas/heroiSchema')
const STATUS = {
    0: 'Disconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Disconectando'
}

// const URI = 'mongodb://localhost:27017/herois'
const URI = "mongodb://rogeriorodrigues:minhasenhasecreta@localhost:27017/herois"
class MongoDB extends ICrud {
    constructor(connection, schema) {
        super()
        this._schema = schema
        this._connection = connection
        // this.connect()
    }

    create(item) {
        return this._schema.create(item)
    }

    read(item, skip = 0, limit = 10) {
        return this._schema.find(item).skip(skip).limit(limit)
    }

    update(id, item) {
        return this._schema.updateOne({ _id: id }, { $set: item })
    }

    delete(id) {
        return this._schema.deleteOne({ _id: id })
    }

    async isConnected() {
        const state = STATUS[this._connection.readyState]


        if (state === 'Conectado') return state
        if (state === 'Conectando')
            new Promise(resolve => setTimeout(resolve, 5000))
            
            return new Promise(resolve => setTimeout( () =>{resolve( STATUS[this._connection.readyState])}, 500))
        // return STATUS[this._connection.readyState]
    }

    static connect() {
        Mongoose.connect(URI,
            { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
                if (error) {
                    console.log('Falha na Conexão', error)
                    return false;
                }
            })
        const connection = Mongoose.connection
        connection.once('open', () => console.log('database conectado!'))
        return connection
    }

    static sum() {
        return true
    }

    count() {
        return this._schema.countDocuments()
    }


}

module.exports = MongoDB 