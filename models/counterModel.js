const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  _id: String,
  seq: { type: Number, required: true }
}, { versionKey: false });

module.exports = mongoose.model("Counter", counterSchema, "Counters");
