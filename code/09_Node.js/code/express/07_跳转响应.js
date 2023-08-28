const express = require('express')
const app = new express()

app.get('/other', (req, res) => {
  // 页面重定向, 跳转响应  比如淘宝未登录状态下点击购物车, 自动跳转到登录界面
  // res.redirect('http://atguigu.com')
  // 下载响应
  // res.download(__dirname + '/singer.json')
  // JSON响应
  // res.json({
  //   name: '百度',
  //   slogan: '百度一下你就知道'
  // })
  // 响应文件内容
  res.sendFile(__dirname + '/跳转响应.html')
})

app.listen(3000, () => {
  console.log('3000端口监听中...')
})
