const { ObjectId } = require('mongoose').Types

const mongoId = Object.freeze({
  create: ObjectId,
  isValid: id => ObjectId.isValid(id)
})

const validate = Object.freeze({
  isAllowed: (allowedMimeTypes, mimetype) => allowedMimeTypes.includes(mimetype),
  isLessThan: (size, maxSize) => size < maxSize,
  isImage: mimetype => mimetype.split('/')[0] === 'image',
  isVideo: mimetype => mimetype.split('/')[0] === 'video'
})

const makeGCS = require('../gcs')
const makeMeta = require('./meta')({ validate })
const makeFile = require('./file')({ mongoId, makeMeta, makeGCS })

module.exports = makeFile
