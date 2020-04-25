'use strict'

module.exports = async (fastify, opts) => {
  // Register the source
  fastify.register(require('./src'))
}
