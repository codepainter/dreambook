const { CustomError } = require('../../custom-errors')

module.exports = function buildMakeFile ({ mongoId, makeMeta }) {
  return function makeFile ({
    id = mongoId.create(),
    type = 'dream', //
    filename = '',
    path = '',
    meta = {}
  } = {}) {
    if (!mongoId.isValid(id)) throw new CustomError({ message: 'Not a valid dreamId', code: 400 })

    if (!type) throw new CustomError({ message: 'Not a valid type', code: 400 })

    if (!filename) throw new CustomError({ message: 'Not a valid filename', code: 400 })

    const metaMade = makeMeta(meta)

    return Object.freeze({
      payload: () => ({ id, type, filename, path, metaMade }), // shorthand
      id: () => id,
      type: () => type,
      filename: () => filename,
      path: () => path,
      meta: () => metaMade
    })
  }
}
