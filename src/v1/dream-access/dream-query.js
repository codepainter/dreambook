module.exports = function makeDreamQuery ({ Dream }) {
  const log = require('debug')('data-access:Dream')

  return Object.freeze({
    create,
    findById,
    findByUserId,
    findByUserIdAndAchieved,
    updateById,
    deleteById
  })

  async function create (dreamInfo) {
    const created = await Dream.create(dreamInfo)
    const { _id, ...info } = created.toObject()
    log('create:', { _id, ...info })
    return { id: _id.toString(), ...info, _id }
  }

  async function findById ({ dreamId, deleted = false }) {
    const { _id, ...found } = await Dream.findById(dreamId)
      .populate('files')
      .lean()
    log('findById:', { _id, ...found })
    return { id: _id.toString(), ...found, _id }
  }

  async function findByUserId ({ userId }) {
    const dreams = await Dream.find({ userId, deleted: false })
      .populate('files')
      .lean()
    log('findByuserId:', dreams)
    return dreams.map(dream => {
      const { _id, ...info } = dream
      return { id: _id.toString(), ...info, _id }
    })
  }

  async function findByUserIdAndAchieved ({ userId, achieved = true }) {
    const dreams = await Dream.find({ userId, achieved })
      .populate('files')
      .lean()
    log('findByUserIdAndAchieved:', dreams)
    return dreams.map(dream => {
      const { _id, ...info } = dream
      return { id: _id.toString(), ...info, _id }
    })
  }

  async function updateById ({ dreamId, toUpdate }) {
    const { _id, ...updated } = await Dream.findByIdAndUpdate(dreamId, toUpdate, { new: true, lean: true, upsert: true })
    log('updateById:', { _id, ...updated })
    return { id: _id.toString(), ...updated, _id }
  }

  async function deleteById ({ dreamId }) {
    const { _id, ...deleted } = await Dream.findByIdAndDelete(dreamId)
    log('deleteById:', { _id, ...deleted })
    return { id: _id.toString(), ...deleted, _id }
  }
}
