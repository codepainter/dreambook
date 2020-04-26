module.exports = function buildMakeDream ({ mongoId, time, sanitize }) {
  return function makeDream ({
    userId = mongoId.create(), //
    images = [],
    date = Date.now(),
    caption = ''
  } = {}) {
    if (!mongoId.isValid(userId)) throw new Error('Not a valid userId')

    if (!Array.isArray(image)) throw new Error('images is not an array')
    if (images.length === 0) throw new Error('Should have at least one image')

    if (!time.isValid(date)) throw new Error('Not a valid date')

    if (sanitize.trim(caption).length === 0) throw new Error('Should have a caption')

    return Object.freeze({
      payload: () => ({ userId, images, date, caption }),
      userId: () => userId,
      images: () => images,
      date: () => time.toISOString(date),
      caption: () => caption
    })
  }
}
