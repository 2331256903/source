const mongoose = require('mongoose')

let BookSchema = new mongoose.Schema({
  name: String,
  author: String,
  price: Number
})
let BookModel = mongoose.model('books', BookSchema)

// 暴露模型对象
module.exports = BookModel
