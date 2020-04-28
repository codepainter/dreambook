module.exports = function makeDreamModel ({ mongoose, File }) {
  const { ObjectId } = mongoose.Types
  const schema = new mongoose.Schema(
    {
      userId: { type: ObjectId, default: null, index: true },
      images: [{ type: ObjectId, ref: 'File', default: null }],
      date: { type: Date, default: Date.now(), index: true },
      caption: { type: String, default: '' },
      achieved: { type: Boolean, default: false, index: true },
      deleted: { type: Boolean, default: false, index: true }
    },
    {
      timestamps: true
    }
  )
  return mongoose.model('Dream', schema)
}
