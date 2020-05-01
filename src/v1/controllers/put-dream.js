module.exports = function makeNewDream ({ createDream }) {
  return async function newDream (httpRequest) {
    const log = require('debug')('controllers:put-dream')
    try {
      const { __v, createdAt, updatedAt, ...createdInfo } = await createDream({ images: httpRequest.files, ...httpRequest.body })
      return {
        statusCode: 200,
        body: { ...createdInfo }
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
