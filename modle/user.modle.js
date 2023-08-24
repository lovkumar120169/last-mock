const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    username:String,
    avatar:String,
    email:String,
    password:String
},{
    versionKey:false
})


const Usermodle=mongoose.model("users",userSchema)

module.exports={Usermodle}