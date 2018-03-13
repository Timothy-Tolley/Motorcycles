const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const server = express()

const motors = require('./routes/motors')
const addMoto = require('./routes/addMoto')
const deleteMoto = require('./routes/deleteMoto')

server.use(bodyParser.json())
server.use(express.static(path.join(__dirname, '../public')))

server.use('/api/v1/', motors)
server.use('/api/v1/', deleteMoto)
server.use('/api/v1/', addMoto)

module.exports = server
