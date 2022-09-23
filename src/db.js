const Pool = require('pg').Pool
const configObj = require('./config')

// Create a new db Pool to conect to the postgres db
const pool = new Pool(configObj)

module.exports = pool
