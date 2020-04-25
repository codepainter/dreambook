const { getEnv } = require('./helpers')

module.exports = async (fastify, opts) => {
  // DB CONNECT
  fastify.register(require('./mongoose-connect').fastify, {
    uri: getEnv('MONGODB_URI', 'mongodb://localhost:27017/test'),
    dbName: getEnv('MONGODB_DB_NAME', 'test'),
    environment: getEnv('NODE_ENV', 'local')
  })

  // APP V1
  fastify.register(require('./v1'))
}
