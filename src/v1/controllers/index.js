// USE-CASES
const { createDream, readDream, updateDream, deleteDream, removeDream } = require('../dream-cases')

// CONTROLLERS
const putDream = require('./put-dream')({ createDream })
const getDream = require('./get-dream')({ readDream, mapImages })
const patchDream = require('./patch-dream')({ updateDream })
const delDream = require('./del-dream')({ deleteDream }) // soft delete
const remDream = require('./rem-dream')({ removeDream }) // hard delete

module.exports = {
  putDream,
  getDream,
  patchDream,
  delDream,
  remDream
}

// helper stuffs
const { find, has, map, isUndefined } = require('lodash')

function mapImages (file) {
  return Array.isArray(file) ? map(file, file => reduceFile(file)) : reduceFile(file)
}

function reduceFile (file) {
  let original = find(file.gcs, { type: 'original' })
  let quality = find(file.gcs, { type: 'quality' })
  let thumbnail = find(file.gcs, { type: 'thumbnail' })
  let thumbnail_small = find(file.gcs, { type: 'thumbnail_small' })
  return {
    id: file._id,
    original: !isUndefined(original) ? original.filename : undefined,
    quality: !isUndefined(quality) ? quality.filename : undefined,
    thumbnail: !isUndefined(thumbnail) ? thumbnail.filename : undefined,
    thumbnail_small: !isUndefined(thumbnail_small) ? thumbnail_small.filename : undefined,
    height: has(file.meta, 'height') ? file.meta.height : undefined,
    width: has(file.meta, 'width') ? file.meta.width : undefined,
    _id: file._id
  }
}
