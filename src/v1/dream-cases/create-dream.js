const { makeDream, makeFile } = require('../dream')

module.exports = function makeCreateDream ({ dreamQuery, fileQuery }) {
  const log = require('debug')('use-case:createDream')
  return async function createDream (dreamData) {
    log('dreamData:', dreamData)
    const filesMade = dreamData.images
      .map(file => makeFile({ filename: file.originalname, path: file.path, meta: file }))
      .map(file => ({
        type: file.type(),
        filename: file.filename(),
        path: file.path(),
        meta: file.meta().payload()
      }))
    log('filesMade:', filesMade)
    const dreamMade = makeDream({ ...dreamData, images: filesMade })
    log('dreamMade:', dreamMade.payload())
    return await dreamQuery.create({
      userId: dreamMade.userId(), //
      // images: dreamMade.images(),
      images: await fileQuery.createMany(filesMade),
      date: dreamMade.date(),
      caption: dreamMade.caption()
    })
  }
}
