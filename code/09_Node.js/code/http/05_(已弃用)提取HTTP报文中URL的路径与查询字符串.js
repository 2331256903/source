const http = require('http')
// 导入 url 模块
const url = require('url')

const server = http.createServer((request, response) => {
  // 解析 request.url
  let res = url.parse(request.url, true)
  console.log(res)
  // 路径
  let pathname = res.pathname
  // 查询字符串
  let keyword = res.query.keyword
  response.end('Hello HTTP Server')  // 设置响应体并结束响应
})
server.listen(9000, () => {
  console.log('服务已启动')
})
