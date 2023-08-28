/**
 * 中间件Middleware本质是一个回调函数
 * 中间件函数可以像路由回调一样访问请求对象request, 响应对象response, 类似路由守卫
 * 作用:
 *   使用函数封装公共操作, 简化代码
 * 分为全局中间件和路由中间件
 * 每一个请求到达服务端之后都会执行中间件函数
 * */

/** 记录每个请求的url与ip地址 */
const express = require('express')
const fs = require('fs')
const path = require('path')
const app = new express()

// 声明中间件函数
function recordMiddleware(req, res, next){
  // 获取url和ip
  let {url, ip} = req
  // 将信息保存在文件access.log  比如服务器访问日志, 通过这种方法实现
  fs.appendFileSync(path.resolve(__dirname, './access.log'), `${url} ${ip}\r\n`)
  // 使用next  响应结束后调用next 继续执行后续路由回调
  next()
}

// 使用中间件函数
app.use(recordMiddleware)

app.get('/home', (req, res) => {
  res.send('前台首页')
})
app.get('/admin', (req, res) => {
  res.send('后台首页')
})
app.get('*', (req, res) => {
  res.statusCode = 404
  res.send('<h1>404 Not Found</h1>')
})

app.listen(3000, () => {
  console.log('3000端口监听中...')
})
