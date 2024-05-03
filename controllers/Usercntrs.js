const USER = require('../model/UserModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



exports.UserSign = async function(req,res){
    try {
        const Signup = req.body
        const checkemail = await USER.findOne({email:req.body.email})
        if (checkemail) {
            return res.status(404).json({message:"Email Already Exist"})
        }
        if(!Signup.name || !Signup.email ){
            // throw new Error("Please Fill All Data")
            res.status(400).json({
                message:"Please Fill All Data"
            })
        }
        Signup.password = await bcrypt.hash(Signup.password,10)
        const userdata = await USER.create(Signup)
        res.status(201).json({
            message:"Created Data",
            userdata
        })
    } catch (error) {
        res.status(404).json({
            message:error.message
        })
    }
}
exports.Login = async function(req,res){
    try {
        const Login = req.body
        if (!Login.email || !Login.password) {
            throw new Error("Please Enter All Field")           
        }
        const useremail = await USER.findOne({email:Login.email})
        if(!useremail){
            throw new Error("Please Check Email")
        }
        const validpass = await bcrypt.compare(Login.password,useremail.password)
        if(!validpass){
            throw new Error("Please Check email or Password")
        }
        res.status(201).json({
            message:"Login Successfuly",
            useremail
        })
    } catch (error) {
        res.status(404).json({
            message:error.message
        })
    }
}