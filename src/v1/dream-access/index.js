const mongoose = require('mongoose')

const File = require('./file-model')({ mongoose })
const fileQuery = require('./file-query')({ File })
const Dream = require('./dream-model')({ mongoose, File })
const dreamQuery = require('./dream-query')({ Dream })

module.exports = {
  dreamQuery,
  fileQuery
}
