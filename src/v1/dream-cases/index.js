// DATA-ACCESS
const { dreamQuery, fileQuery } = require('../dream-access')

// USE-CASES
const createDream = require('./create-dream')({ dreamQuery, fileQuery })
const readDream = require('./read-dream')({ dreamQuery })
const updateDream = require('./update-dream')({ dreamQuery })
const deleteDream = require('./delete-dream')({ dreamQuery }) // soft delete
const removeDream = require('./remove-dream')({ dreamQuery }) // hard delete

module.exports = {
  createDream,
  readDream,
  updateDream,
  deleteDream,
  removeDream
}
