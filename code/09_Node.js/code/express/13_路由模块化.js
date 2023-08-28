/** 如果需求表多, 路由增加, 可能需要创建很多路由规则, 代码体积增加, 维护变得困难, 因此对路由代码进行拆分, 即路由模块化 */

const express = require('express')
const homeRouter = require('./routes/homeRouter')
const adminRouter = require('./routes/adminRouter')
// 创建应用对象
const app = new express()
// 设置
app.use(homeRouter)
app.use(adminRouter)

app.all('*', (req, res) => {
  res.status(404).send(`<h2>404 Not Found</h2>`)
})

app.listen(3000, () => {
  console.log('3000端口监听中...')
})
