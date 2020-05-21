const { getEnv } = require('./helpers')

module.exports = async (fastify, opts) => {
  // DB CONNECT
  fastify.register(require('./mongoose-connect').fastify, {
    uri: getEnv('MONGODB_URI'),
    dbName: getEnv('MONGODB_DB_NAME'),
    environment: getEnv('NODE_ENV')
  })

  // APP V1
  fastify.register(require('./v1'))
}
