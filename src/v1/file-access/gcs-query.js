module.exports = function makeGCSQuery ({ GCS, storage }) {
  const log = require('debug')('data-access:File')

  return Object.freeze({
    upload
  })

  async function upload ({ bucketName, path, target }) {
    const [uploaded, fullResponse] = await storage.bucket(bucketName).upload(path, {
      destination: target,
      public: true,
      metadata: {
        cacheControl: 'public, max-age=31536000'
      }
    })
    console.log('uploaded:', uploaded)
    console.log('fullResponse:', fullResponse)
    console.log(`${path} uploaded to ${bucketName}.`)
  }
}
