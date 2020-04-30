const { CustomError } = require('../../custom-errors')

module.exports = function makeRemoveDream ({ dreamQuery, fileQuery, GCSQuery }) {
  const log = require('debug')('use-case:removeDream')
  return async function removeDream ({ dreamId } = {}) {
    log('dreamData:', { dreamId })
    if (!dreamId) throw new CustomError({ message: 'You have to provide dreamId', code: 400 })

    const dream = await dreamQuery.findById({ dreamId })
    if (!dream) throw new CustomError({ message: 'Dream not found', code: 404 })
    if (dream.deleted !== true) throw new CustomError({ message: 'You can only remove deleted dreams', code: 400 })

    // TODO: move this to a queue
    const hardDeletedFiles = await Promise.all(
      dream.images.map(async file => {
        log('file tobe deleted', file)
        const hardDeletedGCS = await Promise.all(
          file.gcs.map(async gcs => {
            log('gcs tobe deleted:', gcs)
            // remove from GCS and delete from DB
            const [removedObjectFromGCS, deletedGCSFromDB] = await Promise.all([
              GCSQuery.removeObject({ bucket: gcs.bucket, key: gcs.key }), // remove object from GCS
              GCSQuery.hardDeleteById({ GCSId: gcs._id }) // delete document from DB
            ])
            return { gslink: gcs.gslink, removedObjectFromGCS, deletedGCSFromDB }
          })
        )
        // delete file from database
        const deletedFilesFromDB = await fileQuery.hardDeleteById({ fileId: file._id })
        return { fileId: file.id, deletedFilesFromDB, hardDeletedGCS }
      })
    )
    // delete dream from database
    const hardDeletedDream = await dreamQuery.hardDeleteById({ dreamId: dream.id })

    return { hardDeletedDream, hardDeletedFiles }
  }
}
