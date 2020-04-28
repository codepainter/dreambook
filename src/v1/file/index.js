const { ObjectId } = require('mongoose').Types

const mongoId = Object.freeze({
  create: ObjectId,
  isValid: id => ObjectId.isValid(id)
})

const validate = Object.freeze({
  isAllowed: (allowedMimeTypes, mimetype) => (allowedMimeTypes.includes(mimetype) ? true : false)
})

const makeGCS = require('../gcs')
const makeMeta = require('./meta')({ validate })
const makeFile = require('./file')({ mongoId, makeMeta, makeGCS })

module.exports = makeFile
