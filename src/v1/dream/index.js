const { ObjectId } = require('mongoose').Types
const moment = require('moment')
require('moment-round')
const lodash = require('lodash')
const validator = require('validator').default

const time = Object.freeze({
  isValid: date => moment(date).isValid(),
  toISOString: date => moment(date).toISOString()
})

const sanitize = Object.freeze({
  trim: string => lodash.trim(string),
  toBoolean: obj => (typeof obj !== 'boolean' ? validator.toBoolean(obj) : obj)
})

const mongoId = Object.freeze({
  create: ObjectId,
  isValid: id => ObjectId.isValid(id)
})

const makeMeta = require('./meta')({})
const makeFile = require('./file')({ mongoId, makeMeta })
const makeDream = require('./dream')({ mongoId, time, sanitize, makeFile })

module.exports = {
  makeDream, //
  makeFile,
  makeMeta
}
