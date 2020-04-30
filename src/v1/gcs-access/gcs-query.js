module.exports = function makeGCSQuery ({ GCS, storage }) {
  const log = require('debug')('data-access:GCS')

  return Object.freeze({
    upload,
    download,
    removeObject,
    create,
    createMany,
    hardDeleteById,
    hardDeleteManyByIds
  })

  function deconstruct (obj) {
    let { _id, ...info } = obj._doc ? obj._doc : obj
    log('deconstruct:', { _id, ...info })
    return { id: _id.toString(), ...info, _id }
  }

  // GCS Functions
  async function upload ({ bucketName, type, path, target, mimetype }) {
    const [uploaded, fullResponse] = await storage.bucket(bucketName).upload(path, {
      destination: target,
      public: true,
      metadata: {
        cacheControl: 'public, max-age=31536000',
        contentType: mimetype
      }
    })
    // log('uploaded:', uploaded)
    log('fullResponse:', fullResponse)
    // log(`${path} uploaded to ${bucketName} as ${uploaded.name}`)
    return {
      type,
      filename: `https://storage.googleapis.com/${bucketName}/${uploaded.name}`,
      gslink: `gs://${bucketName}/${uploaded.name}`,
      bucket: bucketName,
      key: uploaded.name
    }
  }

  async function download () {
    log('TODO: a download function')
    // TODO: probably a download function to /tmp/something
    return false
  }

  async function removeObject ({ bucket, key } = {}) {
    const removed = await storage
      .bucket(bucket)
      .file(key)
      .delete()
    log('removeObject:', removed)
    return { deleted: true, bucket, key }
  }

  // DB Functions
  async function create (GCSInfo) {
    log('create:', GCSInfo)
    const created = await GCS.create(GCSInfo)
    return deconstruct(created.toObject())
  }

  async function createMany (GCSInfos) {
    log('createMany', GCSInfos)
    const created = await GCS.insertMany(GCSInfos, { lean: true })
    return created.map(file => {
      return deconstruct(file)
    })
  }

  async function hardDeleteById ({ GCSId } = {}) {
    log('hardDeleteById', GCSId)
    const deleted = await GCS.findOneAndDelete({ _id: GCSId })
    return deconstruct(deleted)
  }

  async function hardDeleteManyByIds ({ GCSIds } = {}) {
    log('hardDeleteManyByIds', GCSIds)
    const hardDeletedMany = await Promise.all(GCSIds.map(GCSId => hardDeleteById({ GCSId })))
    return hardDeletedMany
  }
}
