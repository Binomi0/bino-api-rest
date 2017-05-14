var Atleta = require('../models/Atleta')

module.exports = {
    
    find: function(params, callback){
        Atleta.find(params, function(err, atletas){
            if(err){
                callback(err, null);
                return
            }

            callback(null, atletas)
        })
    },

    findById: function(id, callback){
        Atleta.findById(id, function (err, atletas){
            if(err){
                callback(err, null)
                return
            }

            callback(null, atletas)
        })
    },

    create: function(params, callback){        
        Atleta.create(params, function(err, atleta){
            if(err){
                callback(err, null)
                return
            }

            callback(null, atleta)
        })
    },

    update: function(id, params, callback){
        Atleta.findByIdAndUpdate(id, params, {new:true}, function(err, atleta){
            if(err){
                callback(err, null)
                return
            }

            callback(null, atleta)
        })
    },
    
    modify: function(id, params, callback){
        Atleta.findByIdAndUpdate(id, params, {new:true}, function(err, atleta){
            if(err){
                callback(err, null)
                return
            }

            callback(null, atleta)
        })
    },

    delete: function(id, callback){
        Atleta.findByIdAndRemove(id, function(err){
            if(err){
                callback(err, null)
                return
            }

            callback(null, null)
            
        })
    }
}

