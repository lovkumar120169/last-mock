const express=require("express")
const {BlogModle}=require("../modle/blogs.modle")
const blogRouter=express.Router()


blogRouter.get("/api/blogs",async(req,res)=>{
    const {title,category}=req.query
    
    if(title){
        try {
            let blogs=await BlogModle.find({title:title})
            res.status(200).json({blog:blogs})
        } catch (error) {
            res.status(400).json({error:error})
        }
    }else if(category){
        try {
            let blogs=await BlogModle.find({category:category})
            res.status(200).json({blog:blogs})
        } catch (error) {
            res.status(400).json({error:error})
        }

    }else{
        try {
            console.log("luv")
            let blogs=await BlogModle.find()
            res.status(200).json({blog:blogs})
        } catch (error) {
            res.status(400).json({error:error})
        }
        
    }
})

blogRouter.post("/api/blogs",async(req,res)=>{
    try {
        let newBlog = new BlogModle({ ...req.body})
        console.log(newBlog)
        await newBlog.save()
        res.status(200).json({msg:"blog posted",blog:newBlog})
    } catch (error) {
        res.status(400).json({error:error})
    }
})

blogRouter.delete("/api/blogs/:id",async(req,res)=>{
    const {id}=req.params
    try {
        let blogs=await BlogModle.findOneAndDelete({_id:id})
        res.status(200).json({msg:"Blog deleted"})
    } catch (error) {
        res.status(400).json(error)
    }
})

blogRouter.patch("/api/blogs/:id",async(req,res)=>{
    const {username,content,category,date,likes,comments}=req.body;
    const {id}=req.params
    try {
        let data=await BlogModle.findOneAndUpdate({_id:id}, {username:username}, {content: content},{category:category},{date:date},{likes:likes},{comments:comments})
        res.status(200).json({msg:"Blog updated"})
    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports={blogRouter}