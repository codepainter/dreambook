module.exports = function makeGCSModel ({ mongoose }) {
  const { ObjectId } = mongoose.Types
  const schema = new mongoose.Schema(
    {
      type: { type: String, default: '' },
      filename: { type: String, default: '', alias: 'url' },
      gslink: { type: String, default: '' },
      bucket: { type: String, default: '' },
      key: { type: String, default: '', alias: 'Key' }
    },
    {
      timestamps: true
    }
  )
  return mongoose.model('GCS', schema)
}
