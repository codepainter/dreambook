const { CustomError } = require('../../custom-errors')

module.exports = function buildMakeMeta ({ validate }) {
  return function makeMeta ({
    fieldname = 'files',
    originalname = '',
    encoding = '',
    mimetype = '',
    destination = '',
    filename = '',
    path = '',
    size = 0
  } = {}) {
    if (fieldname.length === 0) throw new CustomError({ message: 'Not a valid fieldname', code: 400 })

    if (originalname.length === 0) throw new CustomError({ message: 'Not a valid originalname', code: 400 })

    if (encoding.length === 0) throw new CustomError({ message: 'Not a valid encoding', code: 400 })

    if (mimetype.length === 0) throw new CustomError({ message: 'Not a valid mimetype', code: 400 })
    const allowedMimeTypes = [
      'image/gif', // .gif
      'image/jpeg', // .jpe .jpeg .jpg
      'video/mpeg', // .mp2 .mpa .mpe .mpeg .mpg .mpv2 .
      'video/mp4', // .mp4
      'video/quicktime' // .mov .qt
    ]
    if (!validate.isAllowed(allowedMimeTypes, mimetype)) throw new CustomError({ message: 'mimetype not allowed', code: 400 })

    if (destination.length === 0) throw new CustomError({ message: 'Not a valid destination', code: 400 })

    if (path.length === 0) throw new CustomError({ message: 'Not a valid path', code: 400 })

    if (size === 0) throw new CustomError({ message: 'Not a valid size', code: 400 })

    return Object.freeze({
      payload: () => ({ fieldname, originalname, encoding, mimetype, destination, filename, path, size }), // shorthand
      fieldname: () => fieldname,
      originalname: () => originalname,
      encoding: () => encoding,
      mimetype: () => mimetype,
      destination: () => destination,
      filename: () => filename,
      path: () => path,
      size: () => size
    })
  }
}
