const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema({
  date: String,
  pant_price: Number,
  shirt_price: Number,
}, { versionKey: false });

module.exports = mongoose.model('Price', priceSchema, 'Price');