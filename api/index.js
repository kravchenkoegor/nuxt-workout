// require('dotenv').config()
// const path = require('path')
const https = require('https')
const express = require('express')
const router = express.Router({})
const bodyParser = require('body-parser')
const cors = require('cors')
const redirectSSL = require('redirect-ssl')

// Server
const app = express()
app.use(redirectSSL)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use(router)
require('./src/routes')(router)

// Database
const database = require('./src/database')
database.connect()

// Listen
// app.listen(process.env.PORT || 3000)
// console.log(`Server is listening on port ${process.env.PORT || 3000}`)

// Ping
setInterval(() => https.get(process.env.BASE_URL), 900000)

module.exports = {
  path: '/api/',
  handler: app
}
