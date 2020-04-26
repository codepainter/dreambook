module.exports = function makeDreamModel ({ mongoose, File }) {
  const { ObjectId } = mongoose.Types
  const schema = new mongoose.Schema(
    {
      userId: { type: ObjectId, default: null },
      images: [{ type: ObjectId, ref: 'File', default: null }],
      date: { type: Date, index: true },
      caption: { type: String, default: '' }
    },
    {
      timestamps: true
    }
  )
  return mongoose.model('Dream', schema)
}
