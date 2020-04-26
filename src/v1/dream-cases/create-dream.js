const makeDream = require('../dream')

module.exports = function makeCreateDream ({ dreamQuery }) {
  const log = require('debug')('use-case:createDream')
  return async function createDream (dreamData) {
    log('dreamData:', dreamData)
    const dreamMade = makeDream(dreamData)
    log('dreamMade:', dreamMade.payload())
    return await dreamQuery.create({
      userId: dreamMade.userId(),
      images: dreamMade.images(),
      date: dreamMade.date(),
      caption: dreamMade.caption()
    })
  }
}
