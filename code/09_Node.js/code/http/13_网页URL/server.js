/**
 * 创建一个HTTP服务, 端口为9000, 满足如下需求
 * GET /index.html       响应page/index.html 的文件内容
 * GET /css/app.js       响应page/css/app.css 的文件内容
 * GET /images/logo.png  响应page/images/logo.png 的文件内容
 * */
/**
 * 静态资源指内容长时间不发生改变的资源, 例如图片, 视频, css文件, JS文件, HTML文件, 字体文件等
 * 动态文件指内容经常更新的资源. 百度首页热点列表. 京东搜索列表页面等
 * */
/**
 * HTTP服务在哪个文件夹中寻找静态资源, 那个文件夹就是静态资源目录, 也称之为网站根目录
 *  比如本例中获取请求路径后去page文件夹寻找对应文件, 因此page就是网站根目录
 *  vscode使用live-server访问HTML时, 他启动的服务网站根目录就是当前工作项目的文件夹, 在webstorm或者HBuilderX中也同样
 * */
const http = require('http')
const fs = require('fs')
let server = http.createServer((request, response) => {
  let { pathname } = new URL(request.url, 'http://192.168.1.148')
  // 网站根目录, 可以根据需求随意调整
  let root = __dirname + '/page'
  // 拼接文件路径
  let filePath = root + pathname
  // 读取文件 (fs 异步 API)
  fs.readFile(filePath, (err, data) => {
    if (err) {
      response.setHeader('content-type', 'text/html;charset=utf-8')
      response.statusCode = 500
      response.end('文件读取失败')
      return
    }
    // 响应文件内容
    response.end(data)
  })
/*  if (pathname === '/index.html') {
    let html = fs.readFileSync(__dirname + '/page/index.html')
    response.end(html) // end方法的参数可以是Buffer 也可以是字符串
  } else if (pathname === '/css/index.css') {
    let css = fs.readFileSync(__dirname + '/page/css/index.css')
    response.end(css)
  } else if (pathname === '/images/logo.png') {
    let img = fs.readFileSync(__dirname + '/page/images/logo.png')
    response.end(img)
  } else {
    response.statusCode = 404
    response.end('<h1>404 Not Found</h1>')
  }*/
})
server.listen(9000, () => {
  console.log('服务已经启动...')
})
