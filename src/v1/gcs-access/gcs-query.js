module.exports = function makeGCSQuery ({ GCS, storage }) {
  const log = require('debug')('data-access:GCS')

  return Object.freeze({
    upload,
    create,
    createMany
  })

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
}
