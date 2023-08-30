/**
 * 字段值验证
 * Mongoose有一些内建验证器, 可以对字段值进行验证
 * */
const mongoose = require('mongoose')
mongoose.set('strictQuery', true)

mongoose.connect('mongodb://127.0.0.1:27017/bilibili', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
mongoose.connection.once('open', () => {
  let BookSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true, // 该属性必须不为空 必填
      unique: true // 唯一值, 唯一索引, unique必须要重建集合才能有效果
    },
    author: {
      type: String,
      default: '匿名' // 默认值
    },
    // 类型
    style: {
      type: String,
      enum: ['言情', '城市', '志怪', '恐怖']  // 枚举, 限制值的范围
    },
    price: Number
  })
  let BookModel = mongoose.model('books', BookSchema)
  BookModel.create({
    name: '西游记',
    author: '吴承恩',
    price: 19.9,
    style: '志怪'
  }).then(data => {
    console.log(data)
    mongoose.disconnect()
  }).catch(err => {
    console.log(err)
  })
})
