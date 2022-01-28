// Imports
const express =  require('express')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')

const PORT = process.env.PORT || 5000
const app = express()

// Allow sending raw json
app.use(express.json())

// Accept the url encoded form
app.use(express.urlencoded({extended: false}))

// Create route with express
app.get('/', (req, res) => {
    res.status(200).json({message: 'Welcome to Agilion API'})
})

// Routes
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(PORT, ()=>console.log(`Server is listening on port ${PORT}`))

