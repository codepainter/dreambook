module.exports = function makeDreamQuery ({ Dream }) {
  const log = require('debug')('data-access:Dream')

  return Object.freeze({
    create,
    findById,
    findByUserId,
    findByUserIdAndAchieved,
    updateById,
    hardDeleteById
  })

  function deconstruct (obj) {
    let { _id, ...info } = obj._doc ? obj._doc : obj
    log('deconstruct:', { _id, ...info })
    return { id: _id.toString(), ...info, _id }
  }

  async function create (dreamInfo) {
    log('create:', dreamInfo)
    const created = await Dream.create(dreamInfo)
    return deconstruct(created.toObject())
  }

  async function findById ({ dreamId, deleted = false }) {
    log('findById', { dreamId, deleted })
    const found = await Dream.findById(dreamId)
      .populate({ path: 'images', populate: { path: 'gcs' } })
      .lean()
    if (!found) return false
    return deconstruct(found)
  }

  async function findByUserId ({ userId, deleted = false }) {
    log('findByUserId', { userId, deleted })
    const dreams = await Dream.find({ userId, deleted })
      .populate({ path: 'images', populate: { path: 'gcs' } })
      .lean()
    if (dreams.length === 0) return false
    return dreams.map(dream => {
      return deconstruct(dream)
    })
  }

  async function findByUserIdAndAchieved ({ userId, achieved = true, deleted = false }) {
    log('findByUserIdAndAchieved', { userId, achieved, deleted })
    const dreams = await Dream.find({ userId, achieved, deleted })
      .populate({ path: 'images', populate: { path: 'gcs' } })
      .lean()
    if (dreams.length === 0) return false
    return dreams.map(dream => deconstruct(dream))
  }

  async function updateById ({ dreamId, toUpdate }) {
    log('updateById', { dreamId, toUpdate })
    const updated = await Dream.findByIdAndUpdate(dreamId, toUpdate, { new: true, lean: true })
    return deconstruct(updated)
  }

  async function hardDeleteById ({ dreamId }) {
    log('hardDeleteById', dreamId)
    const deleted = await Dream.findOneAndDelete({ _id: dreamId })
    return deconstruct(deleted)
  }
}
