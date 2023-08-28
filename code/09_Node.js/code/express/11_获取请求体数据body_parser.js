/**
 * express 可以使用body-parser包处理请求体
 *   1. 安装 npm i body-parser
 *   2. 导入body-parser = require('body-parser')
 *   3. 获取中间件函数
 *   4. 设置路由中间件, 然后使用request.body来获取请求体数据
 * */

/** 需求
 * 按照要求搭建HTTP服务
 *
 * GET /login 显示表单网页
 * POST /login 获取表单中的用户名和密码
 * */

const express = require('express')
const app = new express()
const bodyParser = require('body-parser')

app.get('/login', (req, res) => {
  // res.send('表单页面')
  // 响应HTML文件内容
  res.sendFile(__dirname + '/11_form.html')
})

// 解析JSON格式的请求体的中间件
const jsonParser = bodyParser.json()
// 解析querystring格式请求体的中间件
const urlencodedParser = bodyParser.urlencoded({ extended: false })

/** urlencodedParser中间件执行完毕后会向请求对象req上添加一个属性body */
app.post('/login', urlencodedParser, (req, res) => {
  // 获取用户名和密码
  console.log(req.body)
  res.send('获取用户数据')
})

app.listen(3000, () => {
  console.log('3000端口监听中...')
})
