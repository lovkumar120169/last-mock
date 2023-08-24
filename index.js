const express=require("express")
const {connection}=require("./db")
const {userRouter}=require("./routes/user.route")
const {blogRouter}=require("./routes/blog.route")
const app=express()

app.use(express.json())
app.use("/users",userRouter)
app.use("/blog",blogRouter)


app.listen(8080,async()=>{

    try {
        await connection
        console.log("DB is connected")
    } catch (error) {
        console.log(error)
    }
})

