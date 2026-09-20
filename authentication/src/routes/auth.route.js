const express=require('express');
const authRoute=express.Router();
const authController=require('../controller/auth.controller')
authRoute.get('/get',(req,res)=>{
    res.send("api work correctly");
})
/**
 * api hit http://localhost:3000/api/auth/register
 * its works :- new user register function
 */
authRoute.post('/register',authController.registerController);
/**
 * api:- /api/auth/login
 * works:- user login function
 */
authRoute.post('/login',authController.loginController);

module.exports=authRoute