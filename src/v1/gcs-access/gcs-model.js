module.exports = function makeGCSModel ({ mongoose }) {
  const schema = new mongoose.Schema(
    {
      type: { type: String, default: '', index: true },
      filename: { type: String, default: '', alias: 'url' },
      gslink: { type: String, default: '', index: true },
      bucket: { type: String, default: '' },
      key: { type: String, default: '', alias: 'Key' }
    },
    {
      timestamps: true
    }
  )
  return mongoose.model('GCS', schema)
}
