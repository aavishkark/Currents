const jwt = require("jsonwebtoken")
const auth = (req, res, next) => {
    const token = req.headers.token?.split(" ")[1]
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (decoded) {
                req.body.username = decoded.username
                req.body.userid = decoded.userid
                next()
            }
            else {
                res.status(200).send({ "msg": "You are not authorized" })
            }
        })
    }
    else {
        res.send({ "Msg": "Please Login" })
    }
}
module.exports = { auth }
