const { UserModel } = require("../Model/user.model")
const express = require('express')
const userRouter = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')
userRouter.post('/register', (req, res) => {
    const { username, email, password } = req.body
    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                res.status(200).send({ "err": err })
            }
            else {
                const user = new UserModel({ username: username, email: email, password: hash, favorites: [] })
                await user.save()
                res.status(200).send({ "msg": "A user has been registered" })
            }
        })
    }
    catch (err) {
        console.log(err)
        res.status(400).send({ "err": err })
    }
})
userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await UserModel.findOne({ email })
        if (!user) {
            res.status(200).send({ "msg": "User not found" })
            return
        }
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                const token = jwt.sign({ username: user.username, userid: user.id }, process.env.JWT_SECRET)
                res.status(200).send({ "msg": "Login Successfull", "token": token, "user": user })
            }
            else {
                res.status(200).send({ "msg": "wrong Credentials" })
            }
        })
    }
    catch (err) {
        res.status(400).send({ "err": err })
    }
})
userRouter.patch('/update/:id', async (req, res) => {
    const userid = req.params.id
    try {
        const user = await UserModel.findOne({ _id: userid })
        if (user != undefined) {
            await UserModel.findByIdAndUpdate(userid, req.body)
            const updatedUser = await UserModel.findById(userid)
            res.status(200).send({ "msg": `The user with ID: ${userid} has been updated`, "user": updatedUser })
        }
        else {
            res.status(200).send({ "msg": "User not found" })
        }
    }
    catch (err) {
        res.status(400).send({ "error": err })
    }
})
userRouter.get('/singleuser/:id', async (req, res) => {
    const userid = req.params.id
    try {
        const user = await UserModel.findOne({ _id: userid })
        if (user != undefined) {
            res.status(200).send({ "user": user })
        }
        else {
            res.status(200).send({ "msg": "You are not authorized" })
        }
    }
    catch (err) {
        res.status(400).send({ "error": err })
    }
})
module.exports = { userRouter }
