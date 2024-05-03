const mongoose = require('mongoose') 
const Schema = mongoose.Schema

const BlogData = new Schema({
    title:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },  
    seenuser :{
        type:Schema.Types.ObjectId,
        ref:"UserModel",
        required:true
    },
    date: {
        type:Date,
        default: Date.now()
    },
   
})
const Blog = mongoose.model('blog',BlogData)
module.exports = Blog