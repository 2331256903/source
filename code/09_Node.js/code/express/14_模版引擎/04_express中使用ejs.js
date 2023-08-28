const express = require('express')
const path = require('path')

const app = new express()
// 1. 设置模版引擎
app.set('view engine', 'ejs') // 模版引擎还有 pug twing等
// 2. 设置模版文件存放位置  模版文件就是具有模版语法内容的文件
app.set('views', path.resolve(__dirname, './views'))

app.get('/home', (req, res) => {
  // 3. render响应
  // res.render('模版的文件名', '数据')
  // 声明变量
  let title = '尚硅谷'
  res.render('home', {title})
  // 4. 创建模版文件
})

app.listen(3000, () => {
  console.log('3000端口监听中...')
})
