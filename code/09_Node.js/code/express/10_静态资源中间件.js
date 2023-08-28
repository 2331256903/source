const express = require('express')
const app = express()

// 静态资源中间件设置  __dirname + 静态资源文件夹的路径, 当浏览器发送请求过来后, 服务器端到该文件夹中寻找对应的静态资源, 读取并响应文件内容
app.use(express.static(__dirname + '/public'))

app.get('/home', (req, res) => {
  res.end('hello express')
})

app.listen(3000, () => {
  console.log('服务已经启动, 端口3000监听中....')
})

/**
 * 注意:
 *   1. index.html文件为默认打开的资源
 *   2. 如果静态资源与路由规则同时匹配, 谁先匹配响应谁
 *   3. 路由响应动态资源(搜索结果, 排行榜, 最新新闻等), 静态资源中间件响应静态资源
 * */
