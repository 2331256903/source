const http = require('http')

const server = http.createServer((request, response) => {
  // 获取请求的方法
  let { method } = request // 因为request里有method属性, 通过ES6解构赋值提取
  // 获取请求的url路径
  let { pathname } = new URL(request.url, 'http://192.168.1.148')
  response.setHeader('Content-type', 'text/http;charset=utf-8')
  // 判断
  if (method === 'GET' && pathname === '/login'){
    // 登录的情形
    response.end('登录页面')
  } else if (method === 'GET' && pathname === '/reg') {
    // register
    response.end('注册页面')
  } else {
    response.end('`Not Found')
  }
})

server.listen(9000, () =>{
  console.log('服务已经启动.. 端口 9000 监听中....')
})
