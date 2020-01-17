const express = require('express')
const Projects = require('../data/helpers/projectModel')
const Actions = require('../data/helpers/actionModel')

const validateProjectId = require('../middleware/validateProjectId')

const router = express.Router()

// gets all projects
router.get('/', (req, res) => {
  Projects.get()
    .then(projects => {
      res.status(200).json(projects)
    })
    .catch(err => {
      res.status(500).json({ errorMessage: 'Problem getting data' })
    })
})

// gets project with given id
router.get('/:id', validateProjectId, (req, res) => {
  Projects.get(req.params.id)
    .then(project => {
      res.status(200).json(project)
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
  const id = req.params.id
  const changes = req.body
  Projects.update(id, changes)
    .then(updated => {
      res.status(200).json({ message: `updated project at ${id}` })
    })
    .catch(err => {
      res.status(500).json({ errorMessage: 'Problem updating project' })
    })
})

// remove project with given id
router.delete('/:id', validateProjectId, (req, res) => {
  const id = req.params.id
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
  Projects.getProjectActions(id)
    .then(actions => {
      res.status(200).json(actions)
    })
    .catch(err => {
      res.status(500).json({ errorMessage: 'there was an error getting project actions' })
    })
})

// adds action to project with given id
router.post('/:id/actions', validateProjectId, (req, res) => {
  const newAction = {
      ...req.body,
      project_id: req.params.id
  }

  Actions.insert(newAction)
      .then(action => {
          res.status(201).json(action)
      })
      .catch(err => {
          console.log(err)
          res.status(500).json({
              message: 'Error adding action.'
          })
      })
})

module.exports = router