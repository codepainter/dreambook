const { CustomError } = require('../../custom-errors')

module.exports = function makeRemoveDream ({ dreamQuery, fileQuery }) {
  const log = require('debug')('use-case:removeDream')
  return async function removeDream ({ dreamId } = {}) {
    log('dreamData:', { dreamId })
    if (!dreamId) throw new CustomError({ message: 'You have to provide dreamId', code: 400 })

    const dream = await dreamQuery.findById({ dreamId })
    if (!dream) throw new CustomError({ message: 'Dream not found', code: 404 })

    const hardDeletedDream = await dreamQuery.hardDeleteById({ dreamId })
    const hardDeletedFile = await fileQuery.hardDeleteManyById({ fileIds: hardDeletedDream.images })
    // const hardDeletedGCS = await fileQuery.hardDeleteManyById({ GCSIds: hardDeletedFile.gcs })

    return {
      dream: hardDeletedDream,
      files: {
        deletedImages: hardDeletedDream.images,
        deletedCount: hardDeletedFile.deletedCount
      }
      // gcs:{
      //   deletedImages: hardDeletedFile.gcs,
      //   deletedCount: hardDeletedGCS.deletedCount
      // }
    }
  }
}
