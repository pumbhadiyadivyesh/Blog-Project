const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AdminData = new Schema({
    Adminname:{
        type:String,
        required:true,
        unique: true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true,
        unique: true
    }
}) 
const Admin = mongoose.model('AdminModel',AdminData)
module.exports = Admin