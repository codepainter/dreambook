const { getEnv } = require('../helpers')

const { putDream, getDream, patchDream, delDream, rmvDream } = require('./controllers')

const os = require('os')
const multer = require('fastify-multer')
const upload = multer({ dest: os.tmpdir() })

module.exports = async (fastify, opts) => {
  fastify.get('/ping', async (request, reply) => reply.send('pong'))
  fastify.get('/health', async (request, reply) => reply.send('I am healthy'))

  fastify.register(multer.contentParser)
  const { callback } = require('../callback-adapters').fastify({
    apiVersion: getEnv('API_VERSION', 'service-f0.0.0') //
  })

  fastify.post('/new', { preHandler: [upload.array('files')] }, callback(putDream))
  fastify.post('/view', callback(getDream))
  fastify.post('/update', callback(patchDream))
  fastify.post('/delete', callback(delDream))
  fastify.post('/remove', callback(rmvDream))
}
