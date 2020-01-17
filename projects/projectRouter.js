const express = require('express')
const Projects = require('../data/helpers/projectModel')

const router = express.Router()

router.post('/', (req, res) => {
  const project = req.body
  Projects.insert(project)
    .then(created => {
      res.status(201).json(created)
    })
    .catch(err => {
      res.status(500).json({ errorMessage: 'Problem adding project' })
    })
})

