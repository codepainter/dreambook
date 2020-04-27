const { CustomError } = require('../../custom-errors')
// const makeDream = require('../dream')

module.exports = function makeDeleteDream ({ dreamQuery }) {
  const log = require('debug')('use-case:deleteDream')
  return async function deleteDream ({ dreamId } = {}) {
    log('dreamData:', { dreamId })
    if (!dreamId) throw new CustomError({ message: 'You have to provide dreamId', code: 400 })

    const dream = await dreamQuery.findById({ dreamId: dreamId })
    if (!dream) throw new CustomError({ message: 'Dream not found', code: 404 })

    return dreamQuery.updateById({ dreamId, toUpdate: { deleted: true } })
  }
}
