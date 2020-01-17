const Actions = require('../data/helpers/actionModel')

function validateActionId(req, res, next) {
  const id = req.params.id
  Actions.get(id)
    .then(action => {
      if (!action) {
          res.status(400).json({ message: 'Invalid action id.' })
      } else {
          next()
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Error retrieving action id.' })
    })
}

module.exports = validateActionId