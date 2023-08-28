const express = require('express')
const app = new express()

// 设置静态资源中间件
app.use(express.static(__dirname + '/xiaomi'))

app.listen(3000, () => {
  console.log('3000端口监听中')
})
