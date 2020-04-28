// ENTITIES
const makeDream = require('../dream')
const makeFile = require('../file')

module.exports = function makeCreateDream ({ dreamQuery, fileQuery }) {
  const log = require('debug')('use-case:createDream')
  return async function createDream (dreamData) {
    log('dreamData:', dreamData)
    const filesMade = dreamData.images
      .map(file => makeFile({ type: 'dream', filename: file.originalname, path: file.path, meta: file }))
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
        }
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
