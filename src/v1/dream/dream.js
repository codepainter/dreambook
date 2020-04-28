const { CustomError } = require('../../custom-errors')

module.exports = function buildMakeDream ({ mongoId, time, validate, sanitize, makeFile }) {
  return function makeDream ({
    id = mongoId.create(),
    userId = mongoId.create(), //
    images = [],
    date = Date.now(),
    caption = '',
    achieved = false,
    deleted = false
  } = {}) {
    if (!mongoId.isValid(id)) throw new CustomError({ message: 'Not a valid dreamId', code: 400 })

    if (!mongoId.isValid(userId)) throw new CustomError({ message: 'Not a valid userId', code: 400 })

    if (!Array.isArray(images)) throw new CustomError({ message: 'images is not an array', code: 400 })
    if (images.length === 0) throw new CustomError({ message: 'Should have at least one image', code: 400 })

    if (!time.isValid(date)) throw new CustomError({ message: 'date is not a valid date', code: 400 })
    date = time.toISOString(date)

    if (sanitize.trim(caption).length === 0) throw new CustomError({ message: 'A Dream should have a caption', code: 400 })

    if (!validate.isBoolean(achieved)) {
      if (!validate.isBooleanString(achieved)) throw new CustomError({ message: 'achieved should be a valid boolean value', code: 400 })
      achieved = sanitize.toBoolean(achieved)
    }
    if (!validate.isBoolean(deleted)) {
      if (!validate.isBooleanString(deleted)) throw new CustomError({ message: 'deleted should be a valid boolean value', code: 400 })
      deleted = sanitize.toBoolean(deleted)
    }

    return Object.freeze({
      payload: () => ({ id, userId, images, date, caption, achieved, deleted }), // shorthand
      id: () => id,
      userId: () => userId,
      images: () => images.map(file => makeFile(file)),
      date: () => date,
      caption: () => caption,
      achieved: () => achieved,
      deleted: () => deleted
    })
  }
}
