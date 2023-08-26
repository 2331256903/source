/** 根据路由参数响应歌手信息, 路径结构: /singer/1.html */
const express = require('express')
const app = express()
// 导入 json 文件 由于singers.json文件内又是一个对象包一个数组, 使用解构赋值拿到数组
const {singers} = require('./singers.json')

app.get('/singer/:id.html', (req, res) => {
  // 获取路由参数 解构赋值
  let {id} = req.params
  // 在数组中寻找对应id的数据
  let result = singers.find(item => {
    if (item.id === Number(id)) {
      return true
    }
  })
  // 判断
  if (!result) {
    res.statusCode = 404
    res.end(`<h1>404 Not Found</h1>`)
    return
  }
  res.end(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Title</title>
    </head>
    <body>
      <h2>${result.singer_name}</h2>
      <img src="${result.singer_pic}" alt>
    </body>
    </html>
  `)
})

app.listen(3000, () => {
  console.log('服务已经启动, 端口3000监听中....')
})
