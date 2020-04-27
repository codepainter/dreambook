// TODO: this
module.exports = function makeEditDream ({ createDream }) {
  return async function editDream (httpRequest) {
    const log = require('debug')('controllers:editDream')
    try {
      const value = await editDream({ dreamId: httpRequest.body.dreamId })
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
