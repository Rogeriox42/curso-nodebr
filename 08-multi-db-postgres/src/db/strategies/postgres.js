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

    async read(item = {}){
        const [dataValues] = await this._herois.findAll({where: {'nome': item}, rawQuery: true})
        const result = dataValues.dataValues
        console.log('dataValues', result)
        return result 
    }

    async update(nome, item){
        const dados = await this.read(nome)
        await this._herois.update( item , {where: {nome: nome}})

        const newItem = await this.read(item.nome) 
        delete newItem.id 
        const response = {
            nome, 
            update: {
                ... newItem 
            }
        }
        
        return response
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
                operatorAliases: false
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