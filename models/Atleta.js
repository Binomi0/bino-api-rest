var mongoose = require('mongoose')

var atletaSchema = new mongoose.Schema({
    codigo: {type: Number},
    nombre: {type:String, default: ''},
    cinturon: {type:String, default:''},
    edad: {type:String, default:''},
    sexo: {type:String, defailt:''},
    discapacidad: {type:String, default:''},
    timestamp: {type:Date, default:Date.now},
    categoria: {type:Array, default:[]},
    subcategoria: {type:Array, default:[]}
})

module.exports = mongoose.model('atletaSchema', atletaSchema)