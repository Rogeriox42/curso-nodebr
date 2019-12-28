const ContextStrategy = require('./db/strategies/base/ContextStrategy')
const MongoDB = require('./db/strategies/mongodb') 
const Postgres = require('./db/strategies/postgres') 

// const { MongoDB, Postgres } = require('./db/strategies') 

const item = {id: 1, name: 'John'}

const contextMongo = new ContextStrategy(new MongoDB()) 
contextMongo.create(item)

const contextPostgres = new ContextStrategy(new Postgres())
contextPostgres.create(item)