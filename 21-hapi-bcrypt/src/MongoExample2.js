const Mongoose = require('mongoose') 
// const USER = process.env.USER || 'rogeriorodrigues'
const USER = process.env.USER 
// const PASSWORD = process.env.PASSWORD || 'minhasenhasecreta'
const PASSWORD = process.env.PASSWORD 
const HOST = process.env.HOST || 'localhost'
const PORT = process.env.PORT || 27017 

const URI = ( !( USER && PASSWORD )) ? `mongodb://${HOST}:${PORT}/herois` : `mongodb://${USER}:${PASSWORD}@${HOST}:${PORT}/herois`
console.log('URI', URI)

Mongoose.connect(`${URI}`, {useNewUrlParser: true}, (error) =>{
    if(!error) return; 
    console.log('Erro na conexão', error) 
})

const connection = Mongoose.connection 

;(() =>{
   setTimeout( () =>{
        const status = connection.readState 
        console.log('status', status) 
   }, 1000) 
})

connection.once('open', () => console.log('Connected to the dataase!')) 

const heroiSchema = Mongoose.Schema({
    nome: {
        type: String, 
        required: true 
    }, 
    poder: {
        type: String, 
        required: true 
    }, 
    insertedAt: {
        type: Date, 
        default: new Date() 
    }
})

//Check the difference between Mongoose.model and Mongoose.Model 

const heroiModel = Mongoose.model('herois', heroiSchema) 

async function main(){
    const result = await heroiModel.create({
        nome: 'Superman', 
        poder: 'Deus'
    })

    console.log('result', result) 

    const listItems = await heroiModel.find() 
    console.log('listItems', listItems) 
}

main() 