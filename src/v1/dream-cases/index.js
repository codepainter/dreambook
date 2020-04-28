// DATA-ACCESS
const dreamQuery = require('../dream-access').query
const fileQuery = require('../file-access').query

// USE-CASES
const createDream = require('./create-dream')({ dreamQuery, fileQuery })
const readDream = require('./read-dream')({ dreamQuery })
const updateDream = require('./update-dream')({ dreamQuery })
const deleteDream = require('./delete-dream')({ dreamQuery }) // soft delete
const removeDream = require('./remove-dream')({ dreamQuery, fileQuery }) // hard delete

module.exports = {
  createDream,
  readDream,
  updateDream,
  deleteDream,
  removeDream
}
