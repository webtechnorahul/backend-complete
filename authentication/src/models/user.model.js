const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:[true,"email already exist"],
        require:[true,"email is mandetory"]
    },
    mobile:{
        type:String,
        unique:[true,"mobile already exist"],
        require:[true,"mobile is mandetory"]
    },
    password:{
        type:String,
        require:[true,"password not given"]
    },
})

const userModel=mongoose.model('user',userSchema);

module.exports=userModel