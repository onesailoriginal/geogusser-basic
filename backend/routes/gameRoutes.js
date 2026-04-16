const express = require('express')
const router = express.Router()
const { userTable, gameAttemptTable, cityTable, sequelize } = require('../dbHandler')
const checkAuth = require('../auth')

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; 
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
  return R * c; 
}




router.post('/guess', checkAuth, async (req, res) => {
    const { cityId, lat, lng } = req.body

    if (!cityId || lat == null || lng == null) {
        return res.status(400).json({ message: 'Hiányzó adatok' })
    }

    try {
        const oneCity = await cityTable.findOne({ where: { id: cityId } })

        if (!oneCity) {
            return res.status(404).json({ message: 'Város nem található' })
        }

        const distance = getDistanceFromLatLonInKm(oneCity.latitude, oneCity.longitude, lat, lng);


        let points = 0
        let isCorrect = false

        if (distance < 50) { 
            points = 10;
            isCorrect = true;
        } else if (distance < 150) { 
            points = 5;
            isCorrect = true;
        }

        const user = await userTable.findOne({
            where: { id: req.user.userId }
        })

        const newScore = user.score + points

        await userTable.update(
            { score: newScore },
            { where: { id: req.user.userId } }
        )

        await gameAttemptTable.create({
            userId: req.user.userId,
            cityId,
            guessLat: lat,
            guessLng: lng,
            distance,
            isCorrect
        })

        return res.status(200).json({
            correct: isCorrect,
            distance,
            score: newScore,
            correctLat: oneCity.latitude, 
            correctLng: oneCity.longitude  
        })

    } catch (err) {
        return res.status(500).json({ message: 'Szerver hiba' })
    }
})

module.exports = router