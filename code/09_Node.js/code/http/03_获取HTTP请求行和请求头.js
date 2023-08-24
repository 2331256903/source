/* 想要获取请求的数据需要通过request对象
* 重要
* 请求方法: request.method
* 请求路径: request.url
* URL路径: require('url').parse(request.url).pathname
* URL查询字符串: require('url').parse(request.url,true).query
* 请求头: request.headers
* 不重要
* 请求版本: request.httpVersion
* 请求体: request.on('data',function(chunk){})
*        request.on('end',function(){})
* */
/* 注意:
* 1. request.url 只能获取路径以及查询字符串, 无法获取URL中的域名以及协议的内容
* 2. request.headers将请求转化成一个对象, 并将属性名都转化成了小写, 同时属性名中含有-的属性名在log时转化成字符串
* 3. 关于路径, 如果访问网站的时候, 只填写了IP地址或者是域名信息, 此时的请求路径为 /
* 4. 关于favicon.ico 这个请求是属于浏览器自动发送的请求
* */
const http = require('http')
const server = http.createServer((request, response) => {
  // 获取请求方法
  // console.log(request.method)
  // 获取请求的 URL
  // console.log(request.url) // 只包含 url 中的路径与查询字符串
  // 获取 HTTP 协议的版本号
  // console.log(request.httpVersion)
  // 获取 HTTP 协议的请求头
  // console.log(request.headers.host)
  response.setHeader('content-type', 'text/http;charset=utf-8')
  response.end('http')  // 设置响应体并结束响应
})
server.listen(9000, () => {
  console.log('服务已启动')
})
