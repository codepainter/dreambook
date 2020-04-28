const mongoose = require('mongoose')

const Dream = require('./dream-model')({ mongoose })
const query = require('./dream-query')({ Dream })

module.exports = {
  query, //
  model: Dream
}
