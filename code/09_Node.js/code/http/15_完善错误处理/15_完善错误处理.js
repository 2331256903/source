/**
 * 应当根据不同的错误返回不同的错误编号和提示
 * */
const http = require('http')
const fs = require('fs')
const path = require('path')
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
  if (request.method !== 'GET') {
    response.statusCode = 405
    response.end('<h1>405 Method Not Allow</h1>')
    return
  }
  let { pathname } = new URL(request.url, 'http://192.168.1.148')
  let root = __dirname + '/page'
  let filePath = root + pathname
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // 设置字符集
      response.setHeader('content-type', 'text/html;charset=utf-8')
      // 判断错误代号
      switch (err.code) {
        case 'ENOENT':
          response.statusCode = 404
          response.end('<h1>404 Not Found</h1>')
          break
        case 'EPERM':
          response.statusCode = 403
          response.end('<h1>403 Forbidden</h1>')
          break
        default:
          response.statusCode = 500
          response.end('<h1>Internal Server Error</h1>')
      }
      return
    }
    let ext = path.extname(filePath).slice(1)
    let type = mimes[ext]
    if (type) {
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
