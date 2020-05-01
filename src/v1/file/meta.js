const { CustomError } = require('../../custom-errors')

module.exports = function buildMakeMeta ({ validate }) {
  return function makeMeta ({
    fieldname = '',
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
    const maxImageSize = 5 * 1024 * 1024 // 5MB
    const allowedImageMimeTypes = [
      'image/gif', // .gif
      'image/jpeg', // .jpe .jpeg .jpg
      'image/png' // .png
    ]
    const maxVideoSize = 50 * 1024 * 1024 // 10MB
    const allowedVideoMimeTypes = [
      'video/mpeg', // .mp2 .mpa .mpe .mpeg .mpg .mpv2 .
      'video/mp4', // .mp4
      'video/quicktime' // .mov .qt
    ]
    if (validate.isImage(mimetype)) {
      if (!validate.isAllowed(allowedImageMimeTypes, mimetype)) throw new CustomError({ message: 'image mimetype not allowed', code: 400 })
      if (!validate.isLessThan(size, maxImageSize)) throw new CustomError({ message: `Image size too big: ${size} > ${maxImageSize}`, code: 400 })
    } else if (validate.isVideo(mimetype)) {
      if (!validate.isAllowed(allowedVideoMimeTypes, mimetype)) throw new CustomError({ message: 'video mimetype not allowed', code: 400 })
      if (!validate.isLessThan(size, maxVideoSize)) throw new CustomError({ message: `Video size too big: ${size} > ${maxVideoSize}`, code: 400 })
    } else {
      throw new CustomError({ message: `Unknown mimetype: ${mimetype}`, code: 400 })
    }

    if (destination.length === 0) throw new CustomError({ message: 'Not a valid destination', code: 400 })

    if (filename.length === 0) throw new CustomError({ message: 'Not a valid filename', code: 400 })

    if (path.length === 0) throw new CustomError({ message: 'Not a valid path', code: 400 })

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
