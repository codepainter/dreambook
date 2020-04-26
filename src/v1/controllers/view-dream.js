module.exports = function makeViewDream ({ readDream }) {
  return async function viewDream (httpRequest) {
    const log = require('debug')('controllers:viewDream')
    try {
      const value = await readDream({ dreamId: httpRequest.body.dreamId })
      return {
        statusCode: 200,
        body: value
      }
    } catch (error) {
      log('error:', error)
      return {
        statusCode: error.code,
        body: error.message
      }
    }
  }
}
