const { ObjectId } = require('mongoose').Types

const mongoId = Object.freeze({
  create: ObjectId,
  isValid: id => ObjectId.isValid(id)
})

const makeGCS = require('./gcs')({ mongoId })

module.exports = makeGCS
