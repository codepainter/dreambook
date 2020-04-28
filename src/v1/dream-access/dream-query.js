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

  async function create (dreamInfo) {
    const created = await Dream.create(dreamInfo)
    const { _id, ...info } = created.toObject()
    log('create:', { _id, ...info })
    return { id: _id.toString(), ...info, _id }
  }

  async function findById ({ dreamId, deleted = false }) {
    const found = await Dream.findById(dreamId)
      .populate({ path: 'images', populate: { path: 'gcs' } })
      .lean()
    log('findById:', found)
    if (!found) return false
    const { _id, ...info } = found
    return { id: _id.toString(), ...info, _id }
  }

  async function findByUserId ({ userId }) {
    const dreams = await Dream.find({ userId, deleted: false })
      .populate({ path: 'images', populate: { path: 'gcs' } })
      .lean()
    log('findByuserId:', dreams)
    if (dreams.length === 0) return false
    return dreams.map(dream => {
      const { _id, ...info } = dream
      return { id: _id.toString(), ...info, _id }
    })
  }

  async function findByUserIdAndAchieved ({ userId, achieved = true, deleted = false }) {
    const dreams = await Dream.find({ userId, achieved, deleted })
      .populate({ path: 'images', populate: { path: 'gcs' } })
      .lean()
    log('findByUserIdAndAchieved:', dreams)
    if (dreams.length === 0) return false
    return dreams.map(dream => {
      const { _id, ...info } = dream
      return { id: _id.toString(), ...info, _id }
    })
  }

  async function updateById ({ dreamId, toUpdate }) {
    const { _id, ...updated } = await Dream.findByIdAndUpdate(dreamId, toUpdate, { new: true, lean: true })
    log('updateById:', { _id, ...updated })
    return { id: _id.toString(), ...updated, _id }
  }

  async function hardDeleteById ({ dreamId }) {
    const { _id, ...deleted } = await Dream.findByIdAndDelete(dreamId)
    log('hardDeleteById:', { _id, ...deleted })
    return { id: _id.toString(), ...deleted._doc, _id }
  }
}
