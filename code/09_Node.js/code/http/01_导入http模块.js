// 1. 导入http模块
const http = require('http')

// 2. 创建服务对象
/*
*   http 对象的 createServer 方法, 返回一个对象, 接收一个函数作为实参, 该匿名函数接收两个形参作为参数, 通常使用request和response
*   匿名函数在内部调用的时候会接收两个实参, 其中第一个实参是一个对象, 是对请求报文的封装对象, 可以获取请求头请求行等请求报文的相关内容; 第二个实参
* 是对响应报文的封装对象, 借助第二个对象可以为浏览器设置响应结果, 比如设置响应行,响应头,响应体
* */
const server = http.createServer((request, response) => {
  response.setHeader('content-type', 'text/http;charset=utf-8')
  response.end('Hello HTTP Server')  // 设置响应体并结束响应
})

// 3. 监听端口, 启动服务  其中回调函数是在服务启动成功后执行
server.listen(9000, () => {
  console.log('服务已启动')
})
/* 此处listen使用默认端口80, 则请求报文中也不携带端口号, 将来发送请求时直接访问ip地址而不用访问端口号就能直接向80端口发送请求 */
