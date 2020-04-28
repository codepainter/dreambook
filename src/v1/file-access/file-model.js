module.exports = function makeFileModel ({ mongoose }) {
  // const { ObjectId } = mongoose.Types
  const schema = new mongoose.Schema(
    {
      type: { type: String, default: 'dream', index: true },
      filename: { type: String, default: '', alias: 'url' },
      path: { type: String, default: '', alias: 'localpath' },
      meta: { type: Object, default: null }
      // exif: { type: Object, default: null },
      // s3: [
      //   {
      //     type: { type: String, default: '' },
      //     filename: { type: String, default: '', alias: 'url' },
      //     bucket: { type: String, default: '' },
      //     key: { type: String, default: '', alias: 'Key' }
      //   }
      // ],
      // point: {
      //   type: {
      //     type: String,
      //     enum: ['Point'],
      //     default: 'Point'
      //   },
      //   coordinates: {
      //     type: [Number], // [longitude, latitude]
      //     default: [0, 0],
      //     index: { type: '2dsphere' }
      //   }
      // },
      // vision: { type: Object, default: null }
    },
    {
      timestamps: true
    }
  )
  return mongoose.model('File', schema)
}
