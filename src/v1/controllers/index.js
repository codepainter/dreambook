// USE-CASES
const { createDream, readDream, updateDream, deleteDream, removeDream } = require('../dream-cases')

// CONTROLLERS
const putDream = require('./put-dream')({ createDream })
const getDream = require('./get-dream')({ readDream })
const patchDream = require('./patch-dream')({ updateDream })
const delDream = require('./del-dream')({ deleteDream })
const rmvDream = require('./rem-dream')({ removeDream })

module.exports = {
  putDream,
  getDream,
  patchDream,
  delDream,
  rmvDream
}
