const express = require('express')
const authRouter = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
require("dotenv").config()

authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

authRouter.get('/google/callback', passport.authenticate('google', { failureRedirect: '/auth/failure' }), (req, res) => {
    const token = jwt.sign({ username: req.user.username, userid: req.user.id }, process.env.JWT_SECRET)
    res.redirect(`${process.env.FRONTEND_URL}/auth/success?token=${token}&userid=${req.user.id}`)
})

authRouter.get('/failure', (req, res) => {
    res.status(200).send({ "msg": "Google authentication failed" })
})

authRouter.get('/success', (req, res) => {
    res.status(200).send({ "msg": "Google authentication successful" })
})

module.exports = { authRouter }
