module.exports = function makeNewDream ({ createDream }) {
  return async function newDream (httpRequest) {
    const log = require('debug')('controllers:newDream')
    try {
      const value = await createDream(httpRequest.body)
      return {
        statusCode: 200,
        body: value
      }
    } catch (error) {
      log('error:', error)
      return {
        statusCode: error.statusCode,
        body: error.message
      }
    }
  }
}
// TODO: next... custom error
