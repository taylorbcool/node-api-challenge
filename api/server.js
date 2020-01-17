const express = require('express')
const projectRouter = require('../projects/projectRouter')
const actionRouter = require('../actions/actionRouter')

const server = express()
server.use(express.json())

server.use('/api/projects', projectRouter)
server.use('/api/projects', actionRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Server up and running!</h2>`)
})