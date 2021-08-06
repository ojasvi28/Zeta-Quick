let mongoose = require('mongoose');
var Schema = mongoose.Schema;
var users = new Schema({
    email: {
        type: String,
        required:true

    },
    password:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
}, { timestamps: true });
module.exports = mongoose.model('Users', users);