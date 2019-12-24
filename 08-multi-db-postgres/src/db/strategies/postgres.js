const ICrud = require('./interface/InterfaceCrud')
const Sequelize = require('sequelize')

class Postgres extends ICrud {
    constructor() {
        super()
        this._driver = null
        this._herois = null
        this._connect()
    }

    create(item) {
        console.log(`O item ${JSON.stringify(item)} foi salvo em Postgres`)
    }

    async isConnected() {
        try {
            await this._driver.authenticate()
            return true
        } catch (error) {
            console.log('error', error)
            return false;
        }
    }

    _connect() {
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
    }

    async _defineModel() {
        this._herois = driver.define('herois', {
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

        await Herois.sync()
    }
}

module.exports = Postgres