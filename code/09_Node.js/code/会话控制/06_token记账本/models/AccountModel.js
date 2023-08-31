const mongoose = require('mongoose')

let AccountSchema = new mongoose.Schema({
  // 标题
  title: {
    type: String,
    required: true
  },
  // 日期
  time: Date,
  // 类型
  type: {
    type: Number,
    default: -1
  },
  // 金额
  account: {
    type: Number,
    required: true
  },
  // 备注
  remarks: {
    type: String,
  }
})
let AccountModel = mongoose.model('accounts', AccountSchema)

// 暴露模型对象
module.exports = AccountModel
