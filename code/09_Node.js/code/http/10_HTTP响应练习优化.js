/* 改进, 利用fs模块读取其他文件下的HTML代码 */
const http = require('http')
const fs = require('fs')
let server = http.createServer((request, response) => {
  // 读取文件内容
  let html = fs.readFileSync(__dirname +'/index.html')
  response.end(html) // end方法的参数可以是Buffer 也可以是字符串
})
server.listen(9000, () => {
  console.log('服务已经启动...')
})
/* 此时想修改样式, 直接修改table.html文件即可 */
