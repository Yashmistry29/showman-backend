const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  e_id: Number,
  name: String,
  address: String,
  phone: String,
  type: Array,
  wages_type: String,
}, { versionKey: false });

module.exports = mongoose.model('Employee', employeeSchema, "Employee");