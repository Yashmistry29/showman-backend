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

const dbModels = mongoose.model('User', userSchema, "Admin");

// dbModels.create([{
//   "_id": "6410337db891c1dd07e68cdc",
//   "email": "sharadjmistry@gmail.com",
//   "password": "3691308f2a4c2f6983f2880d32e29c84",
//   "username": "sm"
// }]);

module.exports = dbModels

