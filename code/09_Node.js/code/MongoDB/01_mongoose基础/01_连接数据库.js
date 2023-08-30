// 1. 安装mongoose
// 2. 导入
const mongoose = require('mongoose')

// 设置strictQuery为true
mongoose.set('strictQuery', true)

// 3. 连接 mongodb服务  mongodb协议 IP地址 \端口号 路径(数据库的名称)  如果数据库不存在, 则会自动创建
/* 此处我的电脑只能通过127.0.0.1访问数据库, 换成其他ip会报错 */
mongoose.connect('mongodb://127.0.0.1:27017/bilibili', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// 4. 设置回调   连接成功或失败, 启动或关闭连接时使用函数做些事
// 设置连接成功后的回调  建议使用once指定回调, 事件只执行一次
mongoose.connection.once('open', () => {
  console.log('连接成功')
  // app.listen(8080)
})
// 设置连接错误时的回调
mongoose.connection.on('error', () => {
  console.log('连接失败')
})
// 设置连接关闭时的回调
mongoose.connection.on('close', () => {
  console.log('链接关闭')
})

// 关闭MongoDB的链接
/*setTimeout(() => {
  mongoose.disconnect()
}, 2000)*/

