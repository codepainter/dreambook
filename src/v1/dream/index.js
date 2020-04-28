const { ObjectId } = require('mongoose').Types
const moment = require('moment')
require('moment-round')
const { trim } = require('lodash')
const { isBoolean, toBoolean } = require('validator').default

const time = Object.freeze({
  isValid: date => moment(date).isValid(),
  toISOString: date => moment(date).toISOString()
})

const validate = Object.freeze({
  isBoolean: arg => typeof arg === 'boolean',
  isBooleanString: str => isBoolean(str)
})

const sanitize = Object.freeze({
  trim: string => trim(string),
  toBoolean: string => toBoolean(string, true)
})

const mongoId = Object.freeze({
  create: ObjectId,
  isValid: id => ObjectId.isValid(id)
})

const makeFile = require('../file')
const makeDream = require('./dream')({ mongoId, time, validate, sanitize, makeFile })

module.exports = makeDream
