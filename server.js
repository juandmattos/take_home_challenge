const app = require('./app')
const dotenv = require('dotenv')

dotenv.config({path: __dirname + '/.env'})
const PORT = process.env.PORT || 5000

// Start the server in a specified port or default (5000)
app.listen(PORT, () => console.log(`Listening on port ${PORT}..`))
