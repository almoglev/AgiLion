// Imports
const path = require('path')
const express =  require('express')
const colors =  require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const req = require('express/lib/request')
const PORT = process.env.PORT || 5000

// Connect to databse
connectDB()

const app = express()

// Allow sending raw json
app.use(express.json())

// Accept the url encoded form
app.use(express.urlencoded({extended: false}))

// Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))

// Serve Frontend
if (process.env.NODE_ENV === 'production') {
    // Set build folder as static
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    // Create the route - loading the index.html that's in that build
    app.get('*', (req, res) => res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html'))
} else {
// Create route with express
    app.get('/', (req, res) => {
        res.status(200).json({message: 'Welcome to AgiLion API'})
    })
}


app.use(errorHandler)

app.listen(PORT, ()=>console.log(`Server is listening on port ${PORT}`))

