// DATA-ACCESS
const dreamQuery = require('../dream-access')

// USE-CASES
const createDream = require('./create-dream')({ dreamQuery })
const readDream = require('./read-dream')({ dreamQuery })
const updateDream = require('./update-dream')({ dreamQuery })
const deleteDream = require('./delete-dream')({ dreamQuery })

module.exports = {
  createDream,
  readDream,
  updateDream,
  deleteDream
}
