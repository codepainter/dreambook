const makeDream = require('../dream')

module.exports = function makeReadDream ({ dreamQuery }) {
  const log = require('debug')('use-case:readDream')
  return async function readDream ({ dreamId } = {}) {
    log('dreamData:', dreamId)
    const dream = await dreamQuery.findById({ dreamId })
    const dreamMade = makeDream(dream)
    log('dreamMade:', dreamMade.payload())
    return await dreamQuery.findById({
      dreamId: dreamMade.id() //
    })
  }
}
