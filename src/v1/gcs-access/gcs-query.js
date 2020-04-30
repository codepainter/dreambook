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
    const created = await GCS.create(GCSInfo)
    const { _id, ...info } = created.toObject()
    log('create:', { _id, ...info })
    return { id: _id.toString(), ...info, _id }
  }

  async function createMany (GCSInfos) {
    const created = await GCS.insertMany(GCSInfos, { lean: true })
    log('createMany:', created)
    return created.map(file => {
      const { _id, ...info } = file
      return { id: _id.toString(), ...info, _id }
    })
  }

  async function hardDeleteById ({ GCSId } = {}) {
    const { _id, ...deleted } = await GCS.findOneAndDelete({ _id: GCSId })
    log('hardDeleteById:', { _id, ...deleted })
    return { id: _id.toString(), ...deleted._doc, _id }
  }

  async function hardDeleteManyByIds ({ GCSIds } = {}) {
    const hardDeletedMany = await Promise.all(GCSIds.map(GCSId => hardDeleteById({ GCSId })))
    log('hardDeleteManyByIds:', hardDeletedMany)
    return hardDeletedMany
  }
}
