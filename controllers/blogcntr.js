const Blog = require('../model/blog')
const UESRMODEL = require('../model/UserModel')



exports.AddBlog = async (req,res)=>{
    try {
         req.body.image = req.file.filename
        if (!req.body.title || !req.body.content || !req.body.image) {
            throw new Error('Please Ernetr Data')
        }
        const checkmail = await UESRMODEL.findOne({email:req.body.email})
        if(checkmail) return res.status(400)({msg:"Email already exists"})
        const BlogData = await Blog.create(req.body)
        res.status(201).json({
            message:"Data Created Successfully",
            Data:BlogData
        })
    } catch (error) {
        res.status(404).json({
            message:error.message
        })
    }
}
exports.getBlogData = async (req,res)=>{
    try {
        const Getdata = await Blog.find(req.body).populate('seenuser')
        res.status(202).json({
            message:"All Data Get",
            Getdata
        })
    } catch (error) {
        res.status(404).json({
            message:error.message
        })
    } 
}

exports.DeleteBlog = async (req,res)=>{
    try {
        const blogId = req.query.id
        await Blog.findByIdAndDelete(blogId);
        res.status(200).json({message:"Deleted Data"})
    } catch (error) {
        res.status(404).json({
            message:error.message
        })
    }
}
exports.UpdateBlog = async (req,res)=>{
    try {
        const UpdateData = await Blog.findByIdAndUpdate(req.query.id , req.body,{new : true});
        res.status(202).json({
            message:"Data Successfully Updated",
            data:UpdateData
        })
    } catch (error) {
        res.status(404).json({
            message:error.message
        })
    } 
}