var Post = require('../models/Post')

module.exports = {
    
    find: function(params, callback){
        Post.find(params, function(err, posts){
            if(err){
                callback(err, null);
                return
            }

            callback(null, posts)
        })
    },

    findById: function(id, callback){
        Post.findById(id, function (err, posts){
            if(err){
                callback(err, null)
                return
            }

            callback(null, posts)
        })
    },

    create: function(params, callback){
  
        
        Post.create(params, function(err, post){
            if(err){
                callback(err, null)
                return
            }

            callback(null, post)
        })
    },

    update: function(id, params, callback){
        Post.findByIdAndUpdate(id, params, {new:true}, function(err, post){
            if(err){
                callback(err, null)
                return
            }
        })
    },

    delete: function(id, callback){
        Post.findByIdAndRemove(id, function(err){
            if(err){
                callback(err, null)
                return
            }

            callback(null, null)
            
        })
    }
}

