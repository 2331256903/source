/**
 * 媒体类型, MIME类型, 是一种标准, 用来表示文档, 文件或字节流的性质和格式
 * mime类型结构: [type]/[subType]
 *   text/html  image/png等等
 * HTTP服务可以设置响应头Content-type来表明响应体的MIME类型. 浏览器会根据该类型决定如何处理资源
 * 常见mime类型:
 *   html: 'text/html'
 *   css: 'text/css'
 *   js: 'text/javascript'
 *   png: 'image/png'
 *   jpg: 'image/jpg'
 *   mp3: 'video/mp3'
 *   json: 'application/json'
 * 对于未知资源类型, 可以选择application/octet-stream类型, 浏览器在遇到该类型的响应时, 会对响应体内容进行独立存储, 也就是常见的下载效果
 * */
/**
 * 本身浏览器会有mime嗅探的功能, 根据响应回来的内容判定资源类型, 所以前面的代码不加类型也可以运行, 但加上更加规范些
 * */

const http = require('http')
const fs = require('fs')
const path = require('path')
// 声明一个变量 通常不要自己做, 现有的模块会自动完成
let mimes = {
  html: 'text/html',
  css: 'text/css',
  js: 'text/javascript',
  png: 'image/png',
  jpg: 'image/jpg',
  mp3: 'video/mp3',
  json: 'application/json'
}

let server = http.createServer((request, response) => {
  let { pathname } = new URL(request.url, 'http://192.168.1.148')
  let root = __dirname + '/page'
  let filePath = root + pathname
  fs.readFile(filePath, (err, data) => {
    if (err) {
      response.setHeader('content-type', 'text/html;charset=utf-8')
      response.statusCode = 500
      response.end('文件读取失败')
      return
    }
    /* 此处响应头给的值要根据请求文件的后缀决定类型 */
    // 获取文件后缀名
    let ext = path.extname(filePath).slice(1)
    // 获取对应的类型
    let type = mimes[ext]
    if (type) {
      // 匹配到了  同时注意: 此处设置字符集的优先级, 比html中meta标签的charset属性更高
      // 同时, 对于css js和图片等网页的外部资源设置响应时没有必要设置字符集, 这些资源会根据网页的字符集对响应接口做处理, 因此通常只需要检测是不是html即可
      if (ext === 'html') {
        response.setHeader('content-type', type + ';charset=utf-8')
      } else {
        response.setHeader('content-type', type)
      }
    } else {
      response.setHeader('content-type', 'application/octet-stream')
    }
    response.end(data)
  })
})
server.listen(9000, () => {
  console.log('服务已经启动...')
})
