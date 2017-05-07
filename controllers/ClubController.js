var Club = require('../models/Club')

module.exports = {
    
    find: function(params, callback){
        Club.find(params, function(err, result){
            if(err){
                callback(err, null);
                return
            }

            callback(null, result)
        })
    },

    findById: function(id, callback){
        Club.findById(id, function (err, result){
            if(err){
                callback(err, null)
                return
            }

            callback(null, result)
        })
    },

    create: function(params, callback){        
        Club.create(params, function(err, result){
            if(err){
                callback(err, null)
                return
            }

            callback(null, result)
        })
    },

    update: function(id, params, callback){
        Club.findByIdAndUpdate(id, params, {new:true}, function(err, result){
            if(err){
                callback(err, null)
                return
            }

            callback(null, result)
        })
    },


    modify: function(codigo, params, callback){
        Club.findOneAndUpdate({ 'codigo': codigo }, { $push: { 'participantes': params }}, {  new: true },function(err, result) {
            if(err){
                callback(err, null)
                return
            }
            callback(null, result)
        })
    },

    delete: function(id, callback){
        Club.findByIdAndRemove(id, function(err){
            if(err){
                callback(err, null)
                return
            }

            callback(null, null)
            
        })
    }
}

