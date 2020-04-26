module.exports = function makeDeleteDream ({ deleteDream }) {
  return async function deleteDream (httpRequest) {
    const log = require('debug')('controllers:deleteDream')
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
