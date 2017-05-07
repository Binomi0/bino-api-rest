'use strict'

const mongoose = require('mongoose')
//const bcrypt = require('bcrypt-nodejs')

const UserSchema = new mongoose.Schema({
    email: { type:String, unique: true, lowercase: true },
    displayName: String,
    avatar: String,
    password: { type: String, select: false },
    signupDate: {type:Date, default: Date.now()},
    lastLogin: Date
})

// UserSchema.pre('save', function(next) {
//     let user = this
//     if(!user.isModified('password')) return next()

//     bcrypt.genSalt(10, (err, salt) => {
//         if(err) return next()

//         bcrypt.hash(user.password, salt, null, (err, hash) => {
//             if (err) return next(err)

//             user.password = hash
//             next()
//         })
//     })
// })


module.exports = mongoose.model('UserSchema', UserSchema)