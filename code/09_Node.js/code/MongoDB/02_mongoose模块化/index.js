// 导入db文件
const db = require('./db/db')
const mongoose = require('mongoose')
const BookModel = require('./models/BookModel')

// 调用函数
db(() => {
  BookModel.create({
    name: '娃哈哈',
    author: '吴承恩',
    price: 19.9
  }, (err, data) => {
    if (err) {
      console.log(err)
      return
    }
    console.log(data)
    mongoose.disconnect()
  })
}, () => {
  console.log('连接失败')
})


