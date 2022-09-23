const express = require('express')
const cors = require('cors')
const partsRoutes = require('./src/parts/routes')

// Instance of express
const app = express()

// apply middlewares (enable cors and json)
app.use(cors())
app.use(express.json())

// Apply all part routes to prefix '/parts'
app.use('/parts', partsRoutes)

module.exports = app
