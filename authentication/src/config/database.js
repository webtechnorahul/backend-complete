const mongoose=require('mongoose');
const config=require('./config');
async function connectDB(){
    await mongoose.connect(config.MONGO_URI);
    console.log("connect to db");
}
module.exports=connectDB