const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  job_id: Number,
  shirt_quantity: Number,
  pant_quantity: Number,
  createdAt: String,
  returnDate: String,
  totalPrice: Number,
  shirt_data: {
    s_length: String,
    shoulder: String,
    sleeve: String,
    cuff: String,
    chest: String,
    waist: String,
    seat: String,
    pocket: String,
    collar: String,
    strip: String,
    shirt_type: String,
    description: String,
    price: Number
  },
  pant_data: {
    p_length: String,
    waist: String,
    jholo: String,
    seat: String,
    thighs: String,
    knee: String,
    bottom: String,
    back_pocket: String,
    chipti: String,
    pocket_type: String,
    belt_type: String,
    description: String,
    price: Number
  }
}, { versionKey: false })

module.exports = mongoose.model('JobData', JobSchema, "JobData");