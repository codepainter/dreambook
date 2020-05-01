// ENTITIES
const makeDream = require('../dream')
const makeFile = require('../file')
const makeGCS = require('../gcs')

const uuidv4 = require('uuid').v4
const { getEnv } = require('../../helpers')

module.exports = function makeCreateDream ({ dreamQuery, fileQuery, GCSQuery }) {
  const log = require('debug')('use-case:createDream')
  return async function createDream (dreamData) {
    log('dreamData:', dreamData)
    const type = 'dream'
    const uploadType = 'original'
    const environment = getEnv('NODE_ENV', 'local')

    // try to validate the files
    const validated = dreamData.images.map(meta =>
      makeFile({
        type,
        filename: meta.filename,
        path: meta.path,
        meta
      }).payload()
    )
    log('validated:', validated)

    // Upload files to GCS
    const filesUploaded = await Promise.all(
      dreamData.images.map(async file =>
        makeFile({
          type, //
          filename: file.originalname,
          path: file.path,
          meta: file,
          gcs: [
            await GCSQuery.create(
              makeGCS(
                await GCSQuery.upload({
                  bucket: 'this-is-central', //
                  type: uploadType,
                  path: file.path,
                  target: `${environment}/${type}/${dreamData.userId}/${uploadType}/${uuidv4()}-${file.originalname}`,
                  mimetype: file.mimetype
                })
              ).payload()
            )
          ]
        })
      )
    )
    log('filesUploaded:', filesUploaded)

    // Construct valid file payload
    const filesMade = filesUploaded.map(file => ({
      type: file.type(),
      filename: file.gcs()[0].filename,
      // path: file.path(),
      path: file.gcs()[0].gslink,
      meta: file.meta(),
      gcs: file.gcs()
    }))

    log('filesMade:', filesMade)
    log('filesMade[0]:', filesMade[0])
    const dreamMade = makeDream({ ...dreamData, images: filesMade })
    log('dreamMade:', dreamMade.payload())
    return dreamQuery.create({
      userId: dreamMade.userId(), //
      images: await fileQuery.createMany(filesMade),
      date: dreamMade.date(),
      caption: dreamMade.caption()
    })
  }
}
