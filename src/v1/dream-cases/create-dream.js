// ENTITIES
const makeDream = require('../dream')
const makeFile = require('../file')
const makeGCS = require('../gcs')

const uuidv4 = require('uuid').v4

module.exports = function makeCreateDream ({ dreamQuery, fileQuery, GCSQuery }) {
  const log = require('debug')('use-case:createDream')
  return async function createDream (dreamData) {
    log('dreamData:', dreamData)
    const uploaded = await Promise.all(
      dreamData.images.map(image => {
        return GCSQuery.upload({
          bucketName: 'this-is-central', //
          type: 'original',
          path: image.path,
          target: `dream/${dreamData.userId}/original/${uuidv4()}-${image.originalname}`,
          mimetype: image.mimetype
        })
      })
    )
    const gcsMade = uploaded.map(obj => makeGCS(obj))
    log('gcsMade:', gcsMade)

    const gcsCreated = await GCSQuery.createMany(
      gcsMade.map(g => ({
        type: g.type(),
        filename: g.filename(),
        bucket: g.bucket(),
        key: g.key(),
        gslink: g.gslink()
      }))
    )

    const filesMade = dreamData.images
      .map(file =>
        makeFile({
          type: 'dream', //
          filename: file.originalname,
          path: file.path,
          meta: file,
          gcs: gcsCreated // TODO: this is wrong
        })
      )
      .map(file => ({
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
        gcs: gcsCreated
      }))
    log('filesMade:', filesMade)
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
