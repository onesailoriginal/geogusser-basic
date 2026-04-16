require('dotenv').config()
const jwt = require('jsonwebtoken')


function checkAuth(req, res, next) {
    const header = req.headers.authorization

    if (!header) {
        return res.status(401).json({message: 'AUTH ERROR: Hiányzó token'})
    }
    const token = header.split(" ")[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (err) {
        return res.status(401).json({message: 'AUTH ERROR: Érvénytelen token'})
        
    } 
}

module.exports = checkAuth