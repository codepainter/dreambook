const { CustomError } = require('../../custom-errors')

module.exports = function makeReadDream ({ dreamQuery }) {
  const log = require('debug')('use-case:readDream')
  return async function readDream ({ dreamId } = {}) {
    if (!dreamId) throw new CustomError('You have to provide dreamId')
    log('dreamData:', dreamId)

    const found = await dreamQuery.findById({ dreamId })
    if (!found) throw new CustomError({ message: 'Dream not found', code: 404 })
    if (found.deleted === true) throw new CustomError({ message: 'Dream already deleted', code: 404 })

    return found
  }
}
