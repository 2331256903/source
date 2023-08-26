/** express是一个基于Node.js平台的极简,灵活的web应用开发框架, 简单来说就是一个封装好的工具包, 封装了很多功能, 便于开发WEB应用 */
/**
 * 下载
 *  express本质上是一个npm包  npm i express下载
 * */

// 1. 导入
const express = require('express')

// 2. 创建应用对象
const app = express()

// 3. 创建路由
app.get('/home', (req, res) => {
  res.end('hello express')
})

// 4. 监听端口, 启动服务
app.listen(3000, () => {
  console.log('服务已经启动, 端口3000监听中....')
})
