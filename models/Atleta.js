var mongoose = require('mongoose')

var atletaSchema = new mongoose.Schema({
    nombre: {type:String, default: ''},
    cinturon: {type:String, default:''},
    edad: {type:String, default:''},
    discapacidad: {type:String, default:''}
})

module.exports = mongoose.model('atletaSchema', atletaSchema)