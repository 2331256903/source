/* 设置HTTP响应报文
* 设置响应状态码 response.statusCode
* 设置响应状态描述(用的非常少) response.statusMessage
* 设置响应头信息 response.setHeader('头名', '头值')
* 设置响应体 response.write('xx')
*          response.end('xxx')
* */
/* write 和 end 的两种使用情况
*   1. write 和 end 的结合使用, 响应体相对分散
*   response.write('xx')
*   response.write('xx')
*   response.write('xx')
*   response.end() // 每一个请求, 在处理的时候必须要执行end方法
*   2. 单独使用end方法, 响应体相对集中
*   response.end('xxx')
* */
const http = require('http')
const server = http.createServer((request, response) => {
  // 1. 设置响应状态码
  response.statusCode = 203
  // 2. 响应状态的描述 几乎不用
  response.statusMessage = 'iloveyou'
  // 3. 设置响应头
  response.setHeader('content-type', 'text/http;charset=utf-8')
  response.setHeader('Server', 'Node.js')
  response.setHeader('myHeader', 'test test test') // 自定义响应头
  response.setHeader('test', ['a', 'b', 'c']) // 设置多个同名的响应头
  // 4. 响应体的设置
  response.write('love') // 可以多次调用
  
  response.end()  // 设置响应体并结束响应, 使用write设置响应体后, 一般不会在end里再设置响应体了
})
server.listen(9000, () => {
  console.log('服务已启动')
})
