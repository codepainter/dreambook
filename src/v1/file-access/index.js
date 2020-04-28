const mongoose = require('mongoose')

const File = require('./file-model')({ mongoose })
const query = require('./file-query')({ File })

module.exports = {
  query, //
  model: File
}
