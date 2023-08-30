/**
 * cookie
 *   HTTP服务器发送到用户浏览器并保存在本地的一小块数据
 * cookie是保存在浏览器端的一小块数据
 * cookie是按照域名划分保存的
 * 特点:
 *   浏览器向服务器发送请求时, 会自动将当前域名下可用的cookie设置在请求头中, 然后传递给服务器
 *   这个请求头的名字也叫cookie, 所以将cookie理解为一个请求头也可
 * 运行流程:
 *   浏览器填写账号和密码给服务器, 服务器校验通过后, 用响应报文的特殊响应头set-cookie属性返回cookie, 浏览器解析后保存在当前域名下的cookie中
 *   浏览器有了cookie后, 后续向服务器发送请求时就会自动携带cookie
 * */

/**
 * 浏览器操作cookie
 * 浏览器操作cookie的操作, 使用相对较少
 * 1. 禁用所有cookie
 * 2. 删除cookie
 * 3. 查看cookie
 * */

const express = require('express')
const cookieParser = require('cookie-parser')

const app = new express()
app.use(cookieParser())

/* express框架下设置cookie */
app.get('/set-cookie', (req, res) => {
  //res.cookie('name', 'zhangsan') // 会在浏览器关闭的时候销毁
  res.cookie('name', 'lisi', {maxAge: 60 * 1000}) // maxAge设置最大生命周期, 单位是ms, 报文中显示的时间是秒
  res.cookie('theme', 'blue')
  res.send('home')
})

/* express框架下删除cookie */
app.get('/remove-cookie', (req, res) => {
  res.clearCookie('name')
  res.send('删除成功')
})
/* 获取cookie */
app.get('/get-cookie', (req, res) => {
  console.log(req.cookies)
  res.send(`欢迎您 ${req.cookies.name}`)
})

app.listen(3000)
