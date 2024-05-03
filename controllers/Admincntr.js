const Admin = require('../model/Adminmodel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { token } = require('morgan')
const { findOne } = require('../model/blog')

exports.SECURE = async function(req,res,next){
    try {

        const token = req.headers.authorization
        if (!token) {
            throw new Error("Please Attach The Token")
        }
        const tokenCheck =  jwt.verify(token,"surat")
        const tokenuser = await Admin.findById(tokenCheck.id)
        if (!tokenuser) {
            throw new Error("Admin Not Found")
        } 
        next()
    } catch (error) {
        res.status(404).json({
            message:error.message
        })
    }
}

exports.AdminSign = async function(req,res){
    try {
        const Signup = req.body
        const checkemail = await Admin.findOne({email:req.body.email})
        if (checkemail) {
            throw new Error({message:"Email Already Exist"})
        }
        if(!Signup.Adminname || !Signup.email || !Signup.password) {
            throw new Error("Please Fill All Data")
            }
        Signup.password = await bcrypt.hash(Signup.password,10)
        const Admindata = await Admin.create(Signup)
        const token =  jwt.sign({id:Admindata.id},'surat')
        res.status(201).json({
            message:"Created Data",
            Admindata,
            token
        })
    } catch (error) {
        res.status(404).json({
            message:error.message
        })
    }
}
exports.AdminLogin = async function(req,res){
    try {
        const Login = req.body
        if (!Login.email || !Login.password) {
            throw new Error("Please Enter Password") 
                    
        }
        const Adminemail = await Admin.findOne({email:Login.email})
        if(!Adminemail){
            return res.status(400).json({message:"Please Check email or Password"}) 
        }
        const validpass = await bcrypt.compare(Login.password,Adminemail.password)
        if(!validpass){
            return res.status(400).json({message:"Please Check email or Password"}) 
        }
        res.status(201).json({
            message:"Login Successfuly",
            Adminemail
        })
    } catch (error) {
        res.status(404).json({
            message:error.message
        })
    }
}