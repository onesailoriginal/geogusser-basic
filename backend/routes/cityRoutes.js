const express = require('express')
const router = express.Router()
const { cityTable, sequelize } = require('../dbHandler')
const checkAuth  = require('../auth')

router.get('/city', checkAuth, async (req, res) => {
    try {
        const oneCity = await cityTable.findOne({
            attributes: ['id', 'name'],
            order: sequelize.random()
        })

        return res.status(200).json(oneCity)
    } catch (err) {
        return res.status(500).json({ message: 'Szerver hiba' })
    }
})

module.exports = router