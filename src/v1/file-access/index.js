const mongoose = require('mongoose')

const { Storage } = require('@google-cloud/storage')
const storage = new Storage({ keyFilename: '' })

const GCS = require('./gcs-model')({ mongoose })
const GCSQuery = require('./gcs-query')({ GCS, storage })

const File = require('./file-model')({ mongoose })
const query = require('./file-query')({ File })

module.exports = {
  query, //
  model: File
}
