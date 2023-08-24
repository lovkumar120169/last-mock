const mongoose=require("mongoose")


const blogSchema=mongoose.Schema({
    username:String,
    title:String,
    content:String,
    category:String,
    date:String,
    likes:Number,
    comments:String,
    email:String

},{
    versionKey:false
})


const BlogModle=mongoose.model("blogss",blogSchema)

module.exports={BlogModle}
