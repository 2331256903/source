/**
 * 路由确定了应用程序如何响应客户端对特定端点的请求
 * 路由的使用:
 *   一个路由的组成由请求方法,路径和回调函数组成
 *   app.<method>(path, callback)
 * */
const express = require('express')
const app = express()

app.get('/home', (req, res) => {
  res.end('hello express')
})

// 每个网站的首页, 几乎都是这样的路由负责响应
app.get('/', (require, res) => {
  res.end('home')
})

app.post('/login', (req, res) => {
  res.end('login login')
})

// all 只限制请求路径, 请求方式不设限
app.all('/rest', (req, res) => {
  res.end('test test')
})

// * 匹配所有, 可以写在最后用来匹配404响应
app.all('*', (req, res) => {
  res.end('404 Not Found')
})

app.listen(3000, () => {
  console.log('服务已经启动, 端口3000监听中....')
})
