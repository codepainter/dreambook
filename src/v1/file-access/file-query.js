module.exports = function makeFileQuery ({ File }) {
  const log = require('debug')('data-access:File')

  return Object.freeze({
    create,
    createMany,
    findById,
    findManyById,
    updateById,
    hardDeleteById,
    hardDeleteManyByIds
  })

  function deconstruct (obj) {
    let { _id, ...info } = obj._doc ? obj._doc : obj
    log('deconstruct:', { _id, ...info })
    return { id: _id.toString(), ...info, _id }
  }

  async function create (fileInfo) {
    log('create:', fileInfo)
    const created = await File.create(fileInfo)
    return deconstruct(created.toObject())
  }

  async function createMany (fileInfos) {
    log('createMany', fileInfos)
    const createdMany = await File.insertMany(fileInfos, { lean: true })
    return createdMany.map(file => deconstruct(file))
  }

  async function findById ({ fileId } = {}) {
    log('findById', fileId)
    const found = await File.findById(fileId)
      .populate('gcs')
      .lean()
    if (!found) return false
    return deconstruct(found)
  }

  async function findManyById ({ fileIds } = {}) {
    log('findManyById', fileIds)
    const foundMany = await File.find({ _id: { $in: fileIds } })
      .populate('gcs')
      .sort({ createdAt: 1 })
      .lean()
    log('foundManyById:', foundMany)
    if (foundMany.length === 0) return false
    return foundMany.map(file => deconstruct(file))
  }

  async function updateById ({ fileId, toUpdate } = {}) {
    log('updateById:', { fileId, toUpdate })
    const updated = await File.findByIdAndUpdate(fileId, toUpdate, { new: true, lean: true, upsert: true })
    return deconstruct(updated)
  }

  async function hardDeleteById ({ fileId } = {}) {
    log('hardDeleteById:', fileId)
    const hardDeleted = await File.findOneAndDelete({ _id: fileId })
    return deconstruct(hardDeleted)
  }

  async function hardDeleteManyByIds ({ fileIds } = {}) {
    log('hardDeleteManyByIds', fileIds)
    const hardDeletedMany = await Promise.all(fileIds.map(fileId => hardDeleteById({ fileId })))
    return hardDeletedMany
  }
}
