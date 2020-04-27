const { CustomError } = require('../../custom-errors')

module.exports = function buildMakeDream ({ mongoId, time, sanitize, makeFile }) {
  return function makeDream ({
    id = mongoId.create(),
    userId = mongoId.create(), //
    images = [],
    date = Date.now(),
    caption = '',
    deleted = false
  } = {}) {
    if (!mongoId.isValid(id)) throw new CustomError({ message: 'Not a valid dreamId', code: 400 })

    if (!mongoId.isValid(userId)) throw new CustomError({ message: 'Not a valid userId', code: 400 })

    if (!Array.isArray(images)) throw new CustomError({ message: 'images is not an array', code: 400 })
    if (images.length === 0) throw new CustomError({ message: 'Should have at least one image', code: 400 })

    if (!time.isValid(date)) throw new CustomError({ message: 'Not a valid date', code: 400 })

    if (sanitize.trim(caption).length === 0) throw new CustomError({ message: 'Should have a caption', code: 400 })

    const sanitizedDeleted = sanitize.toBoolean(deleted)

    return Object.freeze({
      payload: () => ({ id, userId, images, date, caption }), // shorthand
      id: () => id,
      userId: () => userId,
      images: () => images.map(file => makeFile(file)),
      date: () => time.toISOString(date),
      caption: () => caption,
      deleted: () => sanitizedDeleted
    })
  }
}
