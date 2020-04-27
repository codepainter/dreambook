const { CustomError } = require('../../custom-errors')
const makeDream = require('../dream')

module.exports = function makeUpdateDream ({ dreamQuery }) {
  const log = require('debug')('use-case:updateDream')
  return async function updateDream ({ dreamId, ...changes } = {}) {
    log('dreamData:', { dreamId, ...changes })
    if (!dreamId) throw new CustomError({ message: 'You have to provide dreamId', code: 400 })

    const dream = await dreamQuery.findById({ dreamId })
    if (!dream) throw new CustomError({ message: 'Dream not found', code: 404 })

    const dreamMade = makeDream(dream)
    log('dreamMade:', dreamMade.payload())
    return dreamQuery.updateById({
      dreamId: dreamMade.id(), //
      toUpdate: { ...changes }
    })
  }
}
