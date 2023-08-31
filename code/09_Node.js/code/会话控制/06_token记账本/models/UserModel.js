const mongoose = require('mongoose')

let UserSchema = new mongoose.Schema({
  username: String,
  password: String
})
let UserModel = mongoose.model('users', UserSchema)

// 暴露模型对象
module.exports = UserModel
