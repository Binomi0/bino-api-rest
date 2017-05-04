var mongoose = require('mongoose')

var clubSchema = new mongoose.Schema({
    club: {type:String, default: ''},
    domicilio: {type:String, default:''},
    email: {type:String, default:''},
    dtecnico: {type:String, default:''},
    emailtecnico: {type:String, default:''},
    federacion: {type:String, default:''},
    participantes: {
        nombre: {type:String, default: ''},
        cinturon: {type:String, default:''},
        edad: {type:Number, default:0},
        discapacidad: {type:String, default:''},
        categoria:{type:String, default:''},
        subcategoria:{type:String, default:''}
    },
    timestamp: {type:Date, default:Date.now}
})

module.exports = mongoose.model('clubSchema', clubSchema)