const Projects = require('../data/helpers/projectModel')

function validateProjectId(req, res, next) {
  const id = req.params.id
  Projects.get(id)
    .then(project => {
      if (!project) {
          res.status(400).json({ message: 'Invalid project id.' })
      } else {
          next()
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Error retrieving project id.' })
    })
}

module.exports = validateProjectId