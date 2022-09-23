const path = require('path')
const dotenv = require('dotenv')

const envPath = path.join(__dirname, '..', '.env')
dotenv.config({path: envPath})

const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_PORT,
  DB_NAME,
} = process.env

// Get all env variables responsible for db connection and export it
const configObj = {
  host: DB_HOST,
  database: DB_NAME,
  user: DB_USER,
  password: DB_PASSWORD,
  port: DB_PORT
}

module.exports = configObj
