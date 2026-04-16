const express = require('express')
const router = express.Router()
const { userTable } = require('../dbHandler')
const jwt = require('jsonwebtoken')
require('dotenv').config()

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({message: 'Hiányzó felhasználónév/jelszó'})
    const [user, created] = await userTable.findOrCreate({
        where: { username },
        defaults: {
            username,
            password
        },
    });
    if(!created) return res.status(409).json({message: 'Már van ilyen felhasználó'})
    return res.status(201).json({message: 'Felhasználó sikeresen létrehozva'})
})

router.post('/login',async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({message: 'Hiányzó felhasználónév/jelszó'})
    const oneUser = await userTable.findOne({ where: { username, password } })
    if (!oneUser) return res.status(401).json({ message: 'Nincs  ilyen felhasználó' })
    const token = jwt.sign({userId: oneUser.id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})
    return res.status(200).json({message: 'Felhasználó sikeresen bejelentkezett', token})
})   


module.exports = router