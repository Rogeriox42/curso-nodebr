const Mongoose = require('mongoose')

// Mongoose.connect('mongodb://rogeriorodrigues:minhasenhasecreta@localhost:27017/herois',
// Mongoose.connect('mongodb://localhost:27017/herois',
//     { useNewUrlParser: true }, function (error) {
//         if (!error) return;
//         console.log('Falha na Conexão', error)
//     }
// )

//Immediately Invoked Function to test connection 
// ;(() => {
//     setTimeout(() => {
//         const state = connection.readyState
//         console.log('state', state)
//     }, 1000)
// })()

Mongoose.connect('mongodb://localhost:27017/herois',
    { useNewUrlParser: true, useUnifiedTopology: true  }, function (error) {
        if (!error) return;
        console.log('Falha na Conexão', error)
    }
)

// Sem username e password conecta! ???

const connection = Mongoose.connection
connection.once('open', () => console.log('database conectado!'))


const heroiSchema = new Mongoose.Schema({
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

const model = Mongoose.model('herois', heroiSchema) 

async function main(){
    const resultCadastrar = await model.create({
        nome: 'Batman',
        poder: 'Dinheiro'
    })

    console.log('resultCadastrar', resultCadastrar)

    const list = await model.find() 
    console.log('list', list)
}

main() 

