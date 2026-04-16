require('dotenv').config()
const express = require('express')
const cors = require('cors')
const {sequelize} = require('./dbHandler')
const { start } = require('node:repl')
const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(cors())

//ROUTES
const userRoutes = require('./routes/userRoutes')
const gameRoutes = require('./routes/gameRoutes')
const cityRoutes = require('./routes/cityRoutes')

app.use('/api/user/', userRoutes)
app.use('/api/game/', gameRoutes)
app.use('/api/city/', cityRoutes)




function startServer() {
  //  sequelize.sync({ alter: true })
    app.listen(PORT, () => console.log(`The server is run on: http://localhost:${PORT}`));
}

startServer()