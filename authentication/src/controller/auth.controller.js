const userModel = require('../models/user.model');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const config=require('../config/config.js')

/**
 * register function
 */
async function registerController(req,res){
    const {name,email,mobile,password}=req.body;
    const IsUserExist=await userModel.findOne({
        $or:[
            {email:email},
            {mobile:mobile}
        ]
    });
    if(IsUserExist){
        return res.status(409).json({message:IsUserExist.email==email?"email already exist":"mobile number already exist"});
    }
    const hashPassword=await bcrypt.hash(password,10);
    const user= await userModel.create({
        name,email,mobile,password:hashPassword
    })
    const token=jwt.sign({
        id:user._id,
        email:email
    },config.JWT_SECRET);

    res.cookie("auth-token",token);
    res.status(201).json({message:"user register",user})
};

/**
 * login function
 */
async function loginController(req,res){
    const{email,password}=req.body;
    if(!email){
        return res.send("email is mandetry");
    }
    const isUserExist=await userModel.findOne({email});
    /**  console.log(isUserExist.password);
     console.log(await bcrypt.hash(password,10)); */
    if(!isUserExist){
        return res.status.apply(409).json({message:'email not register'});
    }
    const isPasswordMatch=await bcrypt.compare(password,isUserExist.password);
    if(!isPasswordMatch){
        return res.status(403).json({message:'password incorrect'})
    }
    const token=jwt.sign({
        id:isUserExist._id,
        email:isUserExist.email
    },config.JWT_SECRET);

    res.cookie("auth-token",token);
    res.status(200).json({message:'user login successfully',user:isUserExist})
}

module.exports={
    registerController,
    loginController
}