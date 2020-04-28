module.exports = function makeDelDream ({ deleteDream }) {
  return async function delDream (httpRequest) {
    const log = require('debug')('controllers:del-dream')
    try {
      const value = await deleteDream({ dreamId: httpRequest.body.dreamId })
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
