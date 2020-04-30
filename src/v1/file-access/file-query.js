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

  async function create (fileInfo) {
    const created = await File.create(fileInfo)
    const { _id, ...info } = created.toObject()
    log('create:', { _id, ...info })
    return { id: _id.toString(), ...info, _id }
  }

  async function createMany (fileInfos) {
    const created = await File.insertMany(fileInfos, { lean: true })
    log('createMany:', created)
    return created.map(file => {
      const { _id, ...info } = file
      return { id: _id.toString(), ...info, _id }
    })
  }

  async function findById ({ fileId } = {}) {
    const { _id, ...info } = await File.findById(fileId)
      .populate('gcs')
      .lean()
    log('findById:', { _id, ...info })
    return { id: _id.toString(), ...info, _id }
  }

  async function findManyById ({ fileIds } = {}) {
    const foundMany = await File.find({ _id: { $in: fileIds } })
      .populate('gcs')
      .sort({ createdAt: 1 })
      .lean()
    log('findManyById:', foundMany)
    return foundMany.map(file => {
      const { _id, ...info } = file
      return { id: _id.toString(), ...info, _id }
    })
  }

  async function updateById ({ fileId, toUpdate } = {}) {
    const { _id, ...info } = await File.findByIdAndUpdate(fileId, toUpdate, { new: true, lean: true, upsert: true })
    log('updateById:', { _id, ...info })
    return { id: _id.toString(), ...info, _id }
  }

  async function hardDeleteById ({ fileId } = {}) {
    const deleted = await File.findOneAndDelete({ _id: fileId })
    log('hardDeleteById:', { _id, ...deleted })
    return { id: _id.toString(), ...deleted._doc, _id }
  }

  async function hardDeleteManyByIds ({ fileIds } = {}) {
    const hardDeletedMany = await Promise.all(fileIds.map(fileId => hardDeleteById({ fileId })))
    log('hardDeleteManyByIds:', hardDeletedMany)
    return hardDeletedMany
  }
}
