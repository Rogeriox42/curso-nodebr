const ICrud = require('./../interface/InterfaceCrud')
const Sequelize = require('sequelize')

class Postgres extends ICrud {
    constructor(connection, schema) {
        super()
        this._connection = connection
        this._schema = schema
        // this._connect()

    }

    async create(item) {
        const { dataValues } = await this._schema.create(item)
        // const { dataValues } = await this._schema.create(item)
        return dataValues
    }

    async delete(del_id) {
        const result = await this._schema.destroy({ where: { id: del_id } })
        return result
    }

    async read(query = {}) {
        const [dataValues] = await this._schema.findAll({ where: query, rawQuery: true })
        const result = dataValues.dataValues

        return result
    }

    async update(id, item) {
        const result = await this._schema.update(item, { where: { id: id } })
        return result
    }

    async isConnected() {
        try {
            await this._connection.authenticate()
            return true;
        } catch (error) {
            console.log('error', error)
            return false;
        }
    }

    static async connect() {
        const connection = new Sequelize(
            'heroes',
            'rogeriorodrigues',
            'senhasupersecreta',
            {
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: false,
                operatorAliases: false,
                logging: false
            }
        )
        // await this._defineModel()
        return connection 
    }

    static async defineModel(connection, schema) {
        const model = connection.define(
            schema.name, schema.schema, schema.options
        )

        await model.sync()
        return model 
    }
}

module.exports = Postgres