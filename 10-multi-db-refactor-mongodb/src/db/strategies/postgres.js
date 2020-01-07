const ICrud = require('./interface/InterfaceCrud')
const Sequelize = require('sequelize')

class Postgres extends ICrud {
    constructor() {
        super()
        this._driver = null
        this._herois = null
        this._connect()
        
    }

    async create(item) {
        // console.log(`O item ${JSON.stringify(item)} foi salvo em Postgres`)
        const {dataValues} = await this._herois.create(item) 
        return dataValues 
    }

    async delete(del_id){
        const result = await this._herois.destroy({where: {id: del_id}})
        return result 
    }

    async read(query = {}){
        const [dataValues] = await this._herois.findAll({where: query, rawQuery: true})
        const result = dataValues.dataValues

        return result 
    }

    async update(id, item){
        const result = await this._herois.update( item , {where: {id: id}})
        return result
    }

    async isConnected() {
        try {
            await this._driver.authenticate()
            return true;
        } catch (error) {
            console.log('error', error)
            return false;
        }
    }

    async _connect() {
        this._driver = new Sequelize(
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
        await this._defineModel() 
    }

    async _defineModel() {
        this._herois = this._driver.define('herois', {
            id: {
                type: Sequelize.INTEGER,
                required: true,
                autoIncrement: true,
                primaryKey: true
            },
            nome: {
                type: Sequelize.STRING,
                required: true
            },
            poder: {
                type: Sequelize.STRING,
                required: true
            }
        }, {
            tableName: 'TB_HEROIS',
            freezeTableName: false,
            timestamps: false
        })

        await this._herois.sync()
    }
}

module.exports = Postgres