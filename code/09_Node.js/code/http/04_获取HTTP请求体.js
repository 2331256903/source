const http = require('http')
const server = http.createServer((request, response) => {
  // 1. 声明一个变量接收响应体的结果
  let body
  // 2. 绑定 data 事件 chunk 是一个 buffer 如果做加法运算, 内部会自动将buffer转换成一个字符串
  request.on('data', chunk => {
    body += chunk
  })
  // 3. 绑定 end 事件
  request.on('end', () => {
    console.log(body)
    // 响应
    response.end('http')
  })
})
server.listen(9000, () => {
  console.log('服务已启动')
})
