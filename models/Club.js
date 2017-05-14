var mongoose = require('mongoose')

var clubSchema = new mongoose.Schema ({
    activado: {type:Boolean, default: true},
    codigo: {type:Number, default:0},
    club: {type:String, default: ''},
    domicilio: {type:String, default:''},
    email: {type:String, default:''},
    dtecnico: {type:String, default:''},
    emailtecnico: {type:String, default:''},
    federacion: {type:String, default:''},
    participantes: {type: mongoose.Schema.ObjectId, ref: 'atletaSchema'},
    timestamp: {type:Date, default:Date.now}
})

module.exports = mongoose.model('clubSchema', clubSchema)