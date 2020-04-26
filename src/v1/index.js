const { getEnv } = require('../helpers')

const { newDream, viewDream, editDream, removeDream } = require('./controllers')

const os = require('os')
const multer = require('fastify-multer')
const upload = multer({ dest: os.tmpdir() })

module.exports = async (fastify, opts) => {
  fastify.get('/ping', async (request, reply) => reply.send('pong'))
  fastify.get('/health', async (request, reply) => reply.send('I am healthy'))

  fastify.register(multer.contentParser)
  const { callback } = require('../callback-adapters').fastify({ apiVersion: getEnv('API_VERSION', 'service-f0.0.0') })
  fastify.post('/new', { preHandler: [upload.array('files')] }, callback(newDream))
  fastify.post('/view', callback(viewDream))
  fastify.post('/update', callback(editDream))
  fastify.post('/remove', callback(removeDream))
}
