const Sequelize = require('sequelize')

const HeroiSchema = {
    nome: 'herois',
    schema: {
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
    },
    options: {
        tableName: 'TB_HEROIS',
        freezeTableName: false,
        timestamps: false
    }
}

module.exports = HeroiSchema 