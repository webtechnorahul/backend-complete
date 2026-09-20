

if(!process.env.MONGO_URI){
    console.log("Mongodb url not persent");
}
if(!process.env.JWT_SECRET){
    console.log("jwt token secret not persent");
}

const config={
    "MONGO_URI":process.env.MONGO_URI,
    "JWT_SECRET":process.env.JWT_SECRET
}

module.exports=config