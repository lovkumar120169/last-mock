const express = require("express")
const { Usermodle } = require("../modle/user.modle")
const bcrypt = require("bcrypt")
const userRouter = express.Router()

userRouter.post("/api/register", (req, res) => {
    const { password } = req.body
    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                res.status(400).json({ mag: "something went Wrong" })
            } else {

                let newUser = new Usermodle({ ...req.body, password: hash })
                await newUser.save()
                res.status(200).json({ msg: "User successfully added" })

            }
        });
    } catch (error) {
        res.status(400).json(error)
    }
})

userRouter.post("/api/login", async (req, res) => {
    const { email, password } = req.body
    try {
        let login = await Usermodle.findOne({ email: email })
        if (login) {
            bcrypt.compare(password, login.password, (err, result) => {
                if (result) {
                    res.status(200).json({ msg: "Login Successfull" })
                } else {
                    res.status(200).json({ msg: "Please Enter Correct Password" })
                }
            });
        } else {
            res.status(400).json({ msg: "wrong Credentials" })
        }
    } catch (error) {
        res.status(400).json({ error: error })
    }
})






module.exports = { userRouter }