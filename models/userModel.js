const mongoose = require('mongoose');

const typeObj = {
  type: String,
  required: true,
}
const userSchema = new mongoose.Schema({
  email: typeObj,
  password: typeObj,
  username: typeObj,
}, { versionKey: false })

module.exports = mongoose.model('User', userSchema, "Admin");