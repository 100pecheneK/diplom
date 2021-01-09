const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UserSchema = new Schema({
  username: String,
  password: String,
  phone: String,
  accessToken: String,
  refreshToken: String,
})

module.exports = User = mongoose.model('User', UserSchema)
