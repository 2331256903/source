/**
 * 文档结构可选的常用字段类型列表
 * String 字符串
 * Number 数字
 * Boolean 布尔值
 * Array 数组, 也可以用[]标识
 * Date 日期
 * Buffer Buffer对象
 * Mixed 任意类型, 需要使用mongoose.Schema.Types.Mixed指定
 * ObjectId 对象id, 需要使用mongoose.Schema.Types.ObjectId指定
 * Decimal128  高精度数字, 需要使用mongoose.Schema.Types.Decimal128指定
 * */
const mongoose = require('mongoose')
mongoose.set('strictQuery', true)

mongoose.connect('mongodb://127.0.0.1:27017/bilibili', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
mongoose.connection.once('open', () => {
  let BookSchema = new mongoose.Schema({
    name: String,
    author: String,
    price: Number,
    is_hot: Boolean,
    tags: Array,
    pub_time: Date,
    test: mongoose.Schema.Types.Mixed,
    test2: mongoose.Schema.Types.ObjectId // 文档ID, 通常用于作为外键 关联其他表进行联合查询
  })
  let BookModel = mongoose.model('books', BookSchema)
  BookModel.create({
    name: '西游记',
    author: '吴承恩',
    price: 19.9,
    is_hot: true,
    // 新增属性不存在会直接被忽略
    is_hotxxxxx: true,
    // 新增属性类型出错会直接报错
    // is_hot: 132,
    tags: ['鬼怪', '励志', '社会'],
    pub_time: new Date(),
    test: 'abc'
  }).then(data => {
    console.log(data)
    mongoose.disconnect()
  }).catch(err => {
    // 判断是否有错误
    console.log(err)
  })
})
