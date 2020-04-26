// USE-CASES
const { createDream, readDream, updateDream, deleteDream } = require('../dream-cases')

// CONTROLLERS
const newDream = require('./new-dream')({ createDream })
const viewDream = require('./view-dream')({ readDream })
const editDream = require('./edit-dream')({ updateDream })
const removeDream = require('./remove-dream')({ deleteDream })

module.exports = {
  newDream,
  viewDream,
  editDream,
  removeDream
}
