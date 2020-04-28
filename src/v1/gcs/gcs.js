const { CustomError } = require('../../custom-errors')

module.exports = function buildMakeGCS ({ mongoId }) {
  return function makeGCS ({
    id = mongoId.create(), //
    type = '',
    filename = '',
    bucket = '',
    key = '',
    gslink = ''
  } = {}) {
    if (type.length === 0) throw new CustomError({ message: 'Must provide type', code: 400 })

    if (filename.length === 0) throw new CustomError({ message: 'Must provide filename', code: 400 })

    if (bucket.length === 0) throw new CustomError({ message: 'Must provide bucket', code: 400 })

    if (key.length === 0) throw new CustomError({ message: 'Must provide key', code: 400 })

    if (gslink.length === 0) throw new CustomError({ message: 'Must provide gslink', code: 400 })

    return Object.freeze({
      payload: () => ({ type, filename, bucket, key, gslink }),
      type: () => type,
      filename: () => filename,
      bucket: () => bucket,
      key: () => key,
      gslink: () => gslink
    })
  }
}
