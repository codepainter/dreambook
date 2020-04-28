const mongoose = require('mongoose')
const { dirname } = require('path')

const { getEnv } = require('../../helpers')

const { Storage } = require('@google-cloud/storage')
const storage = new Storage({ keyFilename: getEnv('GOOGLE_APPLICATION_CREDENTIALS', 'wtf') })

const GCS = require('./gcs-model')({ mongoose })
const query = require('./gcs-query')({ GCS, storage })

module.exports = {
  query,
  model: GCS
}
