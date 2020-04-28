module.exports = function makeGetDream ({ readDream }) {
  return async function getDream (httpRequest) {
    const log = require('debug')('controllers:get-dream')
    try {
      log('httpRequest:', httpRequest)
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
