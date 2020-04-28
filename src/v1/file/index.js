const { ObjectId } = require('mongoose').Types

const mongoId = Object.freeze({
  create: ObjectId,
  isValid: id => ObjectId.isValid(id)
})

const makeMeta = require('./meta')()
const makeFile = require('./file')({ mongoId, makeMeta })

module.exports = makeFile
