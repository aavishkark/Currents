const express = require('express')
const app = express()
const connection = require('./db')
const { userRouter } = require('./Routes/users.routes')
const cors = require('cors')
const { favoriteRouter } = require('./Routes/favorites.routes')
const { authRouter } = require('./Routes/auth.routes')
const session = require('express-session')
const { passport } = require('./Config/passport.config')
require("dotenv").config()
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }))
app.use(express.json())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use('/users', userRouter)
app.use('/favorites', favoriteRouter)
app.use('/auth', authRouter)
app.get('/', (req, res) => {
    res.send({ "msg": "This is the home page for WeatherApp Backend" })
})
app.listen(4500, async () => {
    await connection
    console.log("App connected to atlas")
    console.log("App running on port 4500")
})
