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
  // 7. 读取单条
  /*BookModel.findOne({name: '狂飙'}, (err, data) => {
    if (err) {
      console.log('读取失败')
      return
    }
    console.log(data)
  })*/
  // 8. 根据ID获取文档
  /*BookModel.findById('64ed9a2d459348829e591d16', (err, data) => {
    if (err) {
      console.log('读取失败')
      return
    }
    console.log(data)
  })*/
  // 9. 批量获取  加条件则根据条件获取, 不加条件则获取所有
  BookModel.find({author: '余华'}, (err, data) => {
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

