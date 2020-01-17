const express = require('express')
const Projects = require('../data/helpers/projectModel')
const validateProjectId = require('../middleware/validateProjectId')

const router = express.Router()

// gets all projects
router.get('/', (req, res) => {
  Projects.get(req.query)
    .then(projects => {
      res.status(200).json(projects)
    })
    .catch(err => {
      res.status(500).json({ errorMessage: 'Problem getting data' })
    })
})

// gets project with given id
router.get('/:id', validateProjectId, (req, res) => {
  Projects.get(req.query)
    .then(projects => {
      res.status(200).json(projects)
    })
    .catch(err => {
      res.status(500).json({ errorMessage: 'Problem getting data' })
    })
})

// add new project
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

// update project with given id
router.put('/:id', validateProjectId, (req, res) => {
  const id = req.query
  const changes = req.body
  Projects.update(id, changes)
    .then(updated => {
      res.status(200).json({ message: `updated project at ${id} with ${changes}` })
    })
    .catch(err => {
      res.status(500).json({ errorMessage: 'Problem updating project' })
    })
})

// remove project with given id
router.delete('/:id', validateProjectId, (req, res) => {
  const id = req.query
  Projects.remove(id)
  .then(deleted => {
    res.status(200).json({ message: `project with id of ${id} deleted`})
  })
  .catch(err => {
    res.status(500).json({ errorMessage: 'there was an error deleting project' })
  })
})

// return all actions associated with given project id
router.get('/:id/actions', validateProjectId, (req, res) => {
  const id = req.params.id
  Users.getProjectActions(id)
    .then(actions => {
      res.status(200).json(actions)
    })
    .catch(err => {
      res.status(500).json({ errorMessage: 'there was an error getting project actions' })
    })
})

module.exports = router