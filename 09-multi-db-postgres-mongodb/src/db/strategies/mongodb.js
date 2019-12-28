const ICrud = require('./interface/InterfaceCrud')
const Mongoose = require('mongoose')
const Schema = Mongoose.Schema
const STATUS = {
    0: 'Disconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Disconectando'
}

class MongoDB extends ICrud {
    constructor() {
        super()
        this._herois = null
        this._driver = null
        // this.connect()
        // this.defineModel()
    }

    async create(item) {
        console.log('item', item)
        try {
            const result = await this._herois.create(item)
            return result
        } catch (error) {
            console.error('error no create', error.stack)
        }
    }

    async isConnected() {
        const state = STATUS[this._driver.readyState]


        if (state === 'Conectado') return state
        if (state === 'Conectando')
            // return new Promise((resolve, reject) => setTimeout(() => { resolve(state) }, 1000))
            new Promise(resolve => setTimeout(resolve, 1000))
        return STATUS[this._driver.readyState]
    }

    async connect() {
        await Mongoose.connect('mongodb://localhost:27017/herois',
            { useNewUrlParser: true, useUnifiedTopology: true }, async (error) => {
                if (error) {
                    console.log('Falha na Conexão', error)
                    return;
                }
                const connection = Mongoose.connection

                connection.once('open', () => console.log('database conectado!'))
                this._driver = connection
                this.defineModel()
            }
        )

    }

    defineModel() {
        let heroiSchema = new Mongoose.Schema({
            nome: {
                type: String,
                requried: true
            },
            poder: {
                type: String,
                requried: true
            },
            insertedAt: {
                type: Date,
                default: new Date()
            }
        })

        // if(Mongoose.models.herois) delete Mongoose.models.herois 
        // this._herois = Mongoose.model('herois', heroiSchema)
        // this._herois = Mongoose.models.herois ? Mongoose.model('herois') : Mongoose.model('herois', heroiSchema)
        this._herois = Mongoose.models.herois || Mongoose.model('herois', heroiSchema)
    }
}

module.exports = MongoDB 