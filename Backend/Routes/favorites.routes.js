const express = require('express')
const favoriteRouter = express.Router()
const { FavoriteModel } = require("../Model/favorite.model")
const { auth } = require('../Middleware/auth.middleware')

favoriteRouter.post('/addfavorite', auth, async (req, res) => {
    try {
        const favorite = new FavoriteModel(req.body)
        await favorite.save()
        res.status(200).send({ "msg": "A new favorite city has been added" })
    }
    catch (err) {
        res.status(400).send({ "err": err })
    }
})
favoriteRouter.get('/allfavorites', auth, async (req, res) => {
    const userid = req.body.userid
    try {
        const favorites = await FavoriteModel.find({ userId: userid })
        res.status(200).send({ "Favorites": favorites })
    }
    catch (err) {
        res.status(400).send({ "Error": err })
    }
})
favoriteRouter.delete('/removefavorite/:id', auth, async (req, res) => {
    const favid = req.params.id
    try {
        const favorite = await FavoriteModel.findOne({ _id: favid })
        if (favorite != undefined) {
            await FavoriteModel.findByIdAndDelete(favid)
            res.status(200).send({ "msg": `The favorite with ID: ${favid} has been removed` })
        }
        else {
            res.status(200).send({ "msg": "Something Went Wrong" })
        }
    }
    catch (err) {
        res.status(400).send({ "error": err })
    }
})
favoriteRouter.get('/checkfavorite', auth, async (req, res) => {
    const userid = req.body.userid
    const cityName = req.headers.cityname
    try {
        const favorite = await FavoriteModel.findOne({ userId: userid, cityName: cityName })
        if (favorite != undefined) {
            res.status(200).send({ "isFavorite": true, "favorite": favorite })
        }
        else {
            res.status(200).send({ "isFavorite": false })
        }
    }
    catch (err) {
        res.status(400).send({ "error": err })
    }
})
module.exports = {
    favoriteRouter
}
