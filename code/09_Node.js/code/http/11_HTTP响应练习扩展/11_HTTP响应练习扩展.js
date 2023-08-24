/* 改进, 利用fs模块读取其他文件下的HTML代码 */
const http = require('http')
const fs = require('fs')
let server = http.createServer((request, response) => {
  // 获取请求url的路径
  let { pathname } = new URL(request.url, 'http://192.168.1.148')
  // 读取文件内容
  if (pathname === '/') {
    let html = fs.readFileSync(__dirname + '/index.html')
    response.end(html) // end方法的参数可以是Buffer 也可以是字符串
  } else if (pathname === '/index.css') {
    let css = fs.readFileSync(__dirname + '/index.css')
    response.end(css)
  } else if (pathname === '/index.js') {
    let js = fs.readFileSync(__dirname + '/index.js')
    response.end(js)
  } else {
    response.statusCode = 404
    response.end('<h1>404 Not Found</h1>')
  }
})
server.listen(9000, () => {
  console.log('服务已经启动...')
})
/* 此时想修改样式, 直接修改table.html文件即可 */
