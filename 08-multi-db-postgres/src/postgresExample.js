// npm install sequelize pg-hstore pg 

/* 
    Driver object constructor receives 3 parameters and 1 object. 
    3 parameters: database, username, pwd 
    object: {host, dialect, quoteIdentifiers, operatorAliases}
    host = server 
    dialect = type of database (Postgres, Mysql, MsSql) 
    quoteIdentifiers = Not case Sensitive 
    operatorAliases = Ignore deprecated 
*/

const Sequelize = require('sequelize')
const driver = new Sequelize(
    'heroes',
    'rogeriorodrigues',
    'senhasupersecreta', {
    host: 'localhost',
    dialect: 'postgres',
    quoteIdentifiers: false,
    operatorAliases: false
}
)


async function main() {
    const Herois = driver.define('herois', {
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
    // await Herois.create({
    //     'nome': 'The Batman Who Laughs', 
    //     'poder': 'Transform everyone into dark twisted versions' 
    // })

    const result = await Herois.findAll({ 
        raw: true, 
        attributes: ['nome', 'poder']
     })
    console.log('result', result)
}

main() 
