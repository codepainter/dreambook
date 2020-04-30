module.exports = function makeRemDream ({ removeDream }) {
  return async function remDream (httpRequest) {
    const log = require('debug')('controllers:rem-dream')
    try {
      const value = await removeDream({ dreamId: httpRequest.body.dreamId })
      const { hardDeletedDream, hardDeletedFiles } = value
      return {
        statusCode: 200,
        body: {
          deleted: true,
          dream: {
            id: hardDeletedDream.id,
            images: hardDeletedFiles.map(file => ({
              fileId: file.deletedFilesFromDB.id,
              gcs: file.hardDeletedGCS.map(gcs => gcs.deletedGCSFromDB.id)
            }))
          }
        }
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
