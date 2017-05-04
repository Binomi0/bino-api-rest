var Club = require('../models/Club')

module.exports = {
    
    find: function(params, callback){
        Club.find(params, function(err, clubs){
            if(err){
                callback(err, null);
                return
            }

            callback(null, clubs)
        })
    },

    findById: function(id, callback){
        Club.findById(id, function (err, clubs){
            if(err){
                callback(err, null)
                return
            }

            callback(null, clubs)
        })
    },

    create: function(params, callback){        
        Club.create(params, function(err, club){
            if(err){
                callback(err, null)
                return
            }

            callback(null, club)
        })
    },

    update: function(id, params, callback){
        Club.findByIdAndUpdate(id, params, {new:true}, function(err, club){
            if(err){
                callback(err, null)
                return
            }
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

