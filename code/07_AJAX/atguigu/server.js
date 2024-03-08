// 1. 引入express
const express = require('express')

// 2. 创建应用对象
const app = express()

// 3. 创建路由规则
// request 是对请求报文的封装
// response 是对响应报文的封装
app.get('/server', (request, response) => {
  // 设置响应头
  response.setHeader("Access-Control-Allow-Origin", "*")
  // 设置响应体
  response.send('HELLO EXPRESS')
})

app.all('/server', (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*")
  response.setHeader("Access-Control-Allow-Headers", "*") // 设置后可以接收自定义请求头
  response.send('AJAX POST')
})

app.all('/json-server', (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*")
  response.setHeader("Access-Control-Allow-Headers", "*") // 设置后可以接收自定义请求头
  const data = {
    name: 'atguigu'
  }
  // 由于send方法只能接收字符串和buffer
  let str = JSON.stringify(data)
  response.send(str)
})

app.get('/ie', (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*")
  response.setHeader("Access-Control-Allow-Headers", "*") // 设置后可以接收自定义请求头
  response.send('HELLO IE')
})

app.get('/delay', (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*")
  setTimeout(() => {
    response.send('延时响应')
  }, 3000)
})

app.all('/jquery-server', (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*")
  response.setHeader("Access-Control-Allow-Headers", "*")
  const data = {name: '尚硅谷'}
  setTimeout(() => {
    response.send(JSON.stringify(data))
  }, 1000)
})

app.all('/axios-server', (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*")
  response.setHeader("Access-Control-Allow-Headers", "*")
  const data = {name: '尚硅谷'}
  setTimeout(() => {
    response.send(JSON.stringify(data))
  }, 1000)
})

app.all('/fetch-server', (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*")
  response.setHeader("Access-Control-Allow-Headers", "*")
  const data = {name: '尚硅谷'}
  setTimeout(() => {
    response.send(JSON.stringify(data))
  }, 1000)
})

app.all('/jsonp-server', (req, res) => {
  // res.send('console.log("hello jsonp!")') 发送js代码
  const data = {
    name: '尚硅谷'
  }
  let str = JSON.stringify(data)
  res.end(`handle(${str})`)
})

app.all('/check-username', (req, res) => {
  const data = {
    exist: 1,
    msg: '用户名已经存在'
  }
  let str = JSON.stringify(data)
  res.end(`handle(${str})`)
})

app.all('/jquery-jsonp', (req, res) => {
  const data = {
    name: '尚硅谷',
    city: ['北京', '上海', '深圳']
  }
  // 接收 callback 参数
  let cb = req.query.callback
  let str = JSON.stringify(data)
  res.end(`${cb}(${str})`)
})

app.all('/cors-server', (req, res) => {
  //res.setHeader("Access-Control-Allow-Origin", "http://192.168.10.3:5500") // 第二个参数可以限制那些端口发送的网页允许跨域
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.send('hello cors')
})

// 4. 监听端口
app.listen(8000, () => {
  console.log("服务已经启动, 端口8000监听中....")
})
