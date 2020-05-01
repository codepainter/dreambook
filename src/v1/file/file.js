const { CustomError } = require('../../custom-errors')

module.exports = function buildMakeFile ({ mongoId, makeMeta, makeGCS }) {
  return function makeFile ({
    id = mongoId.create(),
    type = '', //
    filename = '',
    path = '',
    meta = {},
    gcs = []
  } = {}) {
    if (!mongoId.isValid(id)) throw new CustomError({ message: 'Not a valid dreamId', code: 400 })

    if (type.length === 0) throw new CustomError({ message: 'Not a valid type', code: 400 })

    if (filename.length === 0) throw new CustomError({ message: 'Not a valid filename', code: 400 })

    if (path.length === 0) throw new CustomError({ message: 'Not a valid path', code: 400 })

    if (!Array.isArray(gcs)) throw new CustomError({ message: 'GCS must be an array', code: 400 })

    const madeMeta = makeMeta(meta).payload()
    const madeGCS = gcs.length > 0 ? gcs.map(g => makeGCS(g).payload()) : []

    return Object.freeze({
      payload: () => ({ id, type, filename, path, meta: madeMeta, gcs: madeGCS, _id: id }), // shorthand
      id: () => id,
      type: () => type,
      filename: () => filename,
      path: () => path,
      meta: () => madeMeta,
      gcs: () => madeGCS,
      _id: () => id
    })
  }
}
