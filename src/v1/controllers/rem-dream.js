module.exports = function makeRemoveDream ({ removeDream }) {
  return async function removeDream (httpRequest) {
    const log = require('debug')('controllers:rem-dream')
    try {
      const value = await removeDream({ dreamId: httpRequest.body.dreamId })
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
