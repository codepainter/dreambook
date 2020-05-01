// ENTITIES
const makeDream = require('../dream')
const makeFile = require('../file')
const makeGCS = require('../gcs')

const uuidv4 = require('uuid').v4

module.exports = function makeCreateDream ({ dreamQuery, fileQuery, GCSQuery }) {
  const log = require('debug')('use-case:createDream')
  return async function createDream (dreamData) {
    log('dreamData:', dreamData)

    // TODO: makeFile BEFORE upload

    // Upload files to GCS
    const filesUploaded = await Promise.all(
      dreamData.images.map(async file => {
        return makeFile({
          type: 'dream', //
          filename: file.originalname,
          path: file.path,
          meta: file,
          gcs: [
            await GCSQuery.create(
              makeGCS(
                await GCSQuery.upload({
                  bucket: 'this-is-central', //
                  type: 'original',
                  path: file.path,
                  target: `dream/${dreamData.userId}/original/${uuidv4()}-${file.originalname}`,
                  mimetype: file.mimetype
                })
              ).payload()
            )
          ]
        })
      })
    )
    log('filesUploaded:', filesUploaded)

    // Construct valid file payload
    const filesMade = filesUploaded.map(file => ({
      type: file.type(),
      filename: file.gcs()[0].filename,
      // path: file.path(),
      path: file.gcs()[0].gslink,
      meta: file.meta(),
      // meta: {
      //   fieldname: file.meta().fieldname(),
      //   originalname: file.meta().originalname(),
      //   encoding: file.meta().encoding(),
      //   mimetype: file.meta().mimetype(),
      //   destination: file.meta().destination(),
      //   filename: file.meta().filename(),
      //   path: file.meta().path(),
      //   size: file.meta().size()
      // },
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
