/**
 * 个性化读取
 *
 * 字段筛选:
 *  0: 不要的字段
 *  1: 要的字段
 * 数据排序:
 *  sort排序
 *  1: 升序
 *  -1: 降序
 * 数据截取:
 *  skip: 跳过
 *  limit: 限定
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
  // 7. 设置字段 exec指定回调而不是find
  /*BookModel.find().select({name: 1, author: 1}).exec((err, data) => {
    if (err) {
      console.log('读取失败')
      return
    }
    console.log(data)
  })*/
  
  // 8. 数据排序 select和sort等都可以连用
  /*BookModel.find().select({name: 1, price: 1, _id: 0}).sort({price: 1}).exec((err, data) => {
    if (err) {
      console.log('读取失败')
      return
    }
    console.log(data)
  })*/
  
  // 9. 数据截断/截取  取出价格的前三名 .sort(price: -1).limit(3)   取出价格的4-6名 .sort(price: -1).skip(3).limit(3)
  BookModel.find()
    .select({name: 1, price: 1, _id: 0})
    .sort({price: -1})
    .skip(3)
    .limit(3)
    .exec((err, data) => {
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

