let mongoose = require('mongoose');
var Schema = mongoose.Schema;
var proj = new Schema({
    projId: {
        type: String,
        required: true

    },
    userId:{
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
    readme:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    zipUrl:{
        type:String,
        required:true
    },
    fileSize:{
        type:String,
        required:true,
    },
    totalDownloads:{
        type:Number,
        default:0
    },
    version:{
        type:String,
        default:"1.0"
    }
}, { timestamps: true });
module.exports = mongoose.model('Proj', proj);