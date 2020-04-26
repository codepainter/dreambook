module.exports = function makeFileQuery ({ File }) {
  const log = require('debug')('data-access:File')

  return Object.freeze({
    create,
    createMany,
    findById,
    updateById,
    deleteById
  })

  async function create (fileInfo) {
    const created = await File.create(fileInfo)
    const { _id, ...info } = created.toObject()
    log('create:', { _id, ...info })
    return { id: _id, ...info, _id }
  }

  async function createMany (fileInfos) {
    const created = await File.insertMany(fileInfos, { lean: true })
    log('createMany:', created)
    return created
  }

  async function findById ({ fileId } = {}) {
    const { _id, ...found } = await File.findById(fileId).lean()
    log('findById:', { _id, ...found })
    return { id: _id, ...found, _id }
  }

  async function updateById ({ fileId, toUpdate } = {}) {
    const { _id, ...updated } = await File.findByIdAndUpdate(fileId, toUpdate, { new: true, lean: true, upsert: true })
    log('updateById:', { _id, ...updated })
    return { id: _id, ...updated, _id }
  }

  async function deleteById ({ fileId } = {}) {
    const { _id, ...deleted } = await File.findByIdAndDelete(fileId)
    log('deleteById:', { _id, ...deleted })
    return { id: _id, ...deleted, _id }
  }
}
