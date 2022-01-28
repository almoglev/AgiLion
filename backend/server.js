// import packeges
const express =  require('express')
const dotenv = require('dotenv').config()

const PORT = process.env.PORT || 5000
const app = express()
// create route with express
app.get('/', (req, res) => {
    res.status(200).json({message: 'Welcome to Agilion API'})
})
app.listen(PORT, ()=>console.log(`Listening on port ${PORT}...`))

