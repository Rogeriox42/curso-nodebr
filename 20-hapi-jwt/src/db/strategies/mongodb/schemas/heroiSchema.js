const Mongoose = require('mongoose') 

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

// if(Mongoose.models.herois) delete Mongoose.models.herois 
// this._herois = Mongoose.model('herois', heroiSchema)
// this._herois = Mongoose.models.herois ? Mongoose.model('herois') : Mongoose.model('herois', heroiSchema)
const heroiModel = Mongoose.models.herois || Mongoose.model('herois', heroiSchema)
module.exports = heroiModel