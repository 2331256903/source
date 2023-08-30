/**
 * MongoDB不能使用><=等比较运算符, 需要使用替代符号
 *  > $gt
 *  < $lt
 *  >= $gte
 *  <= $lte
 *  !== $ne
 *  db.students.find({id: {$gt: 3}})  id比3大的所有记录
 * */

/**
 * 逻辑运算
 * $or逻辑或
 *  db.student.find({$or: [{age: 18}, {age: 24}]})
 * $and逻辑与
 * */

/**
 * 正则匹配
 * 条件中可以直接使用JS的正则语法, 通过正则进行模糊查询
 * db.student.find({name: /imissyou/})
 * */

const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/bilibili');
mongoose.connection.once('open', () => {
  let BookSchema = new mongoose.Schema({
    name: String,
    author: String,
    price: Number,
    is_hot: Boolean
  });
  let BookModel = mongoose.model('novel', BookSchema);
  // 价格小于20的图书
  /*BookModel.find({price: {$lt: 20}}, (err, data) => {
    if (err) {
      console.log('读取失败')
      return
    }
    console.log(data)
  })*/
  
  // 曹雪芹或者余华的书
  /*BookModel.find({$or: [{author: '曹雪芹'}, {author: '余华'}]}, (err, data) => {
    if (err) {
      console.log('读取失败')
      return
    }
    console.log(data)
  })*/
  
  // 价格大于30 且小于70
  BookModel.find({$and: [{price: {$lt: 70}}, {price: {$gt: 30}}]}, (err, data) => {
    if (err) {
      console.log('读取失败')
      return
    }
    console.log(data)
  })
});
mongoose.connection.on('error', () => {
  console.log('连接失败');
});
mongoose.connection.on('close', () => {
  console.log('连接关闭');
});

