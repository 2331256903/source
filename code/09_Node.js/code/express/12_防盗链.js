/** 防盗链  保护网站资源不被其他网站或者第三方网站滥用, 也可以减少服务器压力 */

const express = require('express')
const app = new express()

// 声明中间件
app.use((req, res, next) => {
  // 检测请求头中的referer是否为 192.168.1.148
  // 获取referer
  let referer = req.get('referer')
  if (referer) {
    // 实例化
    let url = new URL(referer)
    // 获取hostname
    let hostname = url.hostname
    // 判断
    if (hostname !== '127.0.0.1') {
      // 响应404
      res.status(404).send(`<h2>404 Not Found</h2>`)
      return
    }
  }
  next()
})

app.use(express.static(__dirname + '/public'))

app.listen(3000, () => {
  console.log('3000端口监听中...')
})
