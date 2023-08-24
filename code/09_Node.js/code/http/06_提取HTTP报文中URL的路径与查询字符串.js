const http = require('http')

const server = http.createServer((request, response) => {
  // 实例化 URL 的对象 URL实例化的时候可以接收一个或两个参数
  // 一个参数: let url = new URL('http://www.baidui.com/search?a=100&b=200')
  // 两个参数: let url = new URL('/search?a=100&b=200', 'http://192.168.1.148:9000')
  let url = new URL(request.url, 'http://192.168.1.148')
  // 输出路径
  console.log(url.pathname)
  // 输出 keyword 查询字符串  url.searchParams 是一个 map 类型的数据, 要用 get 方法获取 keyword
  console.log(url.searchParams.get('keyword'))
  response.end('url new')  // 设置响应体并结束响应
})
server.listen(9000, () => {
  console.log('服务已启动')
})
