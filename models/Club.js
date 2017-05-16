var mongoose = require('mongoose')

var clubSchema = new mongoose.Schema ({
    activado: {type:Boolean, default: false},
    codigo: {type:Number, default:0},
    club: {type:String, default: ''},
    domicilio: {type:String, default:''},
    email: {type:String, default:''},
    dtecnico: {type:String, default:''},
    emailtecnico: {type:String, default:''},
    federacion: {type:String, default:''},
    participantes: [{type: mongoose.Schema.Types.ObjectId, ref: 'atletaSchema'}],
    timestamp: {type:Date, default:Date.now}
})

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
module.exports = mongoose.model('clubSchema', clubSchema)