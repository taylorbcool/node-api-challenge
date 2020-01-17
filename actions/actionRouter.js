const express = require('express')
const Actions = require('../data/helpers/actionModel')

const validateActionId = require('../middleware/validateActionId')

const router = express.Router()

// gets all actions, no matter what project they're associated with
router.get('/', (req, res) => {
  Actions.get()
      .then(actions => {
          res.status(200).json(actions)
      })
      .catch(err => {
          console.log(err)
          res.status(500).json({
              message: 'Error retrieving actions.'
          })
      })
})

// gets action with given id
router.get('/:id', validateActionId, (req, res) => {
  const id = req.params.id
  Actions.get(id)
      .then(action => {
          res.status(200).json(action)
      })
      .catch(err => {
          console.log(err)
          res.status(500).json({
              message: 'Error retrieving action.'
          })
      })
})

// updates action with given id from project with given id
router.put('/:id', validateActionId, (req, res) => {
  const id = req.params.id
  const changes = req.body
  Actions.update(id, changes)
      .then(action => {
          res.status(201).json({ message: `updated action at ${id}` })
      })
      .catch(err => {
          console.log(err)
          res.status(500).json({
              message: 'Error updating action.'
          })
      })
})

// deletes action with giben id from project with given id
router.delete('/:id', validateActionId, (req, res) => {
  const id = req.params.id
  Actions.remove(id)
      .then(deleted => {
          res.status(200).json({ message: `action with id of ${id} deleted`})
      })
      .catch(err => {
          console.log(err)
          res.status(500).json({
              message: 'Error deleting action.'
          })
      })
})

module.exports = router