/** 针对 /admin,/setting 的请求, 要求url携带code=521参数, 如未携带提示暗号错误 token*/
const express = require('express')
const app = new express()

// 创建路由 前台
app.get('/home', (req, res) => {
  res.send('前台首页')
})

// 声明中间件
let checkoutMiddleware = (req, res, next) => {
  // 判断url中是否code参数为521
  if (req.query.code === '521') {
    next() // 满足条件后执行后续路由函数
  } else {
    res.send('暗号错误')
  }
}

/** 放到受约束的路由规则当中, 实现路由中间件 */
// 后台
app.get('/admin', checkoutMiddleware, (req, res) => {
  res.send('后台首页')
})
// 后台设置
app.get('/setting' ,checkoutMiddleware, (req, res) => {
  res.send('设置页面')
})
app.get('*', (req, res) => {
  res.statusCode = 404
  res.send('<h1>404 Not Found</h1>')
})

app.listen(3000, () => {
  console.log('3000端口监听中...')
})
