module.exports = function makeDreamQuery ({ Dream }) {
  const log = require('debug')('data-access:Dream')

  return Object.freeze({
    create,
    findById,
    updateById,
    deleteById
  })

  async function create (dreamInfo) {
    const created = await Dream.create(dreamInfo)
    const { _id, ...info } = created.toObject()
    log('create:', { _id, ...info })
    return { id: _id, ...info, _id }
  }

  async function findById ({ dreamId }) {
    const { _id, ...found } = await Dream.findById(dreamId)
      .populate('files')
      .lean()
    log('findById:', { _id, ...found })
    return { id: _id, ...found, _id }
  }

  async function updateById ({ dreamId, toUpdate }) {
    const { _id, ...updated } = await Dream.findByIdAndUpdate(dreamId, toUpdate, { new: true, lean: true, upsert: true })
    log('updateById:', { _id, ...updated })
    return { id: _id, ...updated, _id }
  }

  async function deleteById ({ dreamId }) {
    const { _id, ...deleted } = await Dream.findByIdAndDelete(dreamId)
    log('deleteById:', { _id, ...deleted })
    return { id: _id, ...deleted, _id }
  }
}
