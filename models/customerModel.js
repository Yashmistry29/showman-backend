const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  c_id: Number,
  name: String,
  address: String,
  phone: String,
  phone2: String,
  job_ids: [Number],
  latest_job_id: Number,
  deleted_job_ids: [Number]
}, { versionKey: false })

module.exports = mongoose.model('Customer', customerSchema, "Customer");