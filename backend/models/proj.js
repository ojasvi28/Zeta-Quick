let mongoose = require('mongoose');
var Schema = mongoose.Schema;
var proj = new Schema({
    projId: {
        type: String,
        required: true

    },
    techStack: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    readMe:{
        type:String,
        required:true
    },
    totalDownloads:{
        type:Number,
        default:0
    }
}, { timestamps: true });
module.exports = mongoose.model('Proj', proj);