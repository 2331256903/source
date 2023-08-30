const mongoose = require('mongoose')
mongoose.set('strictQuery', true)

mongoose.connect('mongodb://127.0.0.1:27017/bilibili', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
mongoose.connection.once('open', () => {
  // 5. 创建文档的结构对象  设置集合中文档的属性以及属性值的类型
  let BookSchema = new mongoose.Schema({
    name: String,
    author: String,
    price: Number
  })
  
  // 6. 创建模型对象  对文档操作的封装对象, 这个文档可以完成对文档的增删改查操作, 第一个参数是集合名称, 第二个操作是结构对象
  let BookModel = mongoose.model('books', BookSchema)
  
  // 7. 调用模型对象的方法完成 新增 的操作  第一个参数是数据对象, 第二个参数是一个回调函数 回调函数有两个形参:错误对象和插入成功后的文档对象
  BookModel.create({
    name: '西游记',
    author: '吴承恩',
    price: 19.9
  }).then(data => {
    // 如果没有出错, 则输出插入后的文档对象
    console.log(data)
    // 8. 关闭数据库连接(项目运行过程中不会添加该代码)
    mongoose.disconnect()
  }).catch(err => {
    // 判断是否有错误
    console.log(err)
  })
})
mongoose.connection.on('error', () => {
  console.log('连接失败')
})
mongoose.connection.on('close', () => {
  console.log('链接关闭')
})
