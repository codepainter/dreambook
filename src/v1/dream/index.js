const { ObjectId } = require('mongoose').Types
const moment = require('moment')
require('moment-round')
const lodash = require('lodash')

const time = Object.freeze({
  isValid: date => moment(date).isValid(),
  toISOString: date => moment(date).toISOString()
})

const sanitize = Object.freeze({
  trim: string => lodash.trim(string)
})

const mongoId = Object.freeze({
  create: ObjectId(),
  isValid: id => ObjectId.isValid(id)
})

const makeDream = require('./dream')({ mongoId, time, sanitize })

module.exports = makeDream
