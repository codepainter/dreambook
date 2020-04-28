// ENTITIES
const makeDream = require('../dream')
const makeFile = require('../file')
const makeGCS = require('../gcs')

const uuidv4 = require('uuid').v4
const _ = require('lodash')

module.exports = function makeCreateDream ({ dreamQuery, fileQuery, GCSQuery }) {
  const log = require('debug')('use-case:createDream')
  return async function createDream (dreamData) {
    log('dreamData:', dreamData)

    const filesUploaded = await Promise.all(
      _.map(dreamData.images, async file => {
        return makeFile({
          type: 'dream', //
          filename: file.originalname,
          path: file.path,
          meta: file,
          gcs: [
            await GCSQuery.create(
              makeGCS(
                await GCSQuery.upload({
                  bucketName: 'this-is-central', //
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

    const filesMade2 = _.map(filesUploaded, file => ({
      type: file.type(),
      filename: file.filename(),
      path: file.path(),
      // meta: file.meta().payload()
      meta: {
        fieldname: file.meta().fieldname(),
        originalname: file.meta().originalname(),
        encoding: file.meta().encoding(),
        mimetype: file.meta().mimetype(),
        destination: file.meta().destination(),
        filename: file.meta().filename(),
        path: file.meta().path(),
        size: file.meta().size()
      },
      gcs: file.gcs()
    }))

    log('filesMade2:', filesMade2)
    log('filesMade2[0]:', filesMade2[0])
    const dreamMade = makeDream({ ...dreamData, images: filesMade2 })
    log('dreamMade:', dreamMade.payload())
    return dreamQuery.create({
      userId: dreamMade.userId(), //
      images: await fileQuery.createMany(filesMade2),
      date: dreamMade.date(),
      caption: dreamMade.caption()
    })
  }
}
