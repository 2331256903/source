/* 现在修改app.js, 让它自动扫描controllers目录, 找到所有js文件, 导入然后注册每个URL */
// 先导入fs模块, 然后用readdirSync列出文件
// 这里可以用sync是因为启动时只运行一次, 不存在性能问题
/*const fs = require('fs')
const router = require('koa-router')()
let files = fs.readdirSync(__dirname + '/controllers')
// 过滤出.js文件
let js_files = files.filter((f) => {
  return f.endsWith('.js')
})
// 处理每个js文件
for (let f of js_files) {
  console.log(`process controller: ${f}...`)
  let mapping = require(__dirname + '/controllers/' + f)
  for (let url in mapping) {
    if (url.startsWith('GET')) {
      // 如果url以GET开头
      let path = url.substring(4)
      router.get(path, mapping[url])
      console.log(`register URL mapping: POST ${path}`)
    } else {
      // 无效的URL
      console.log(`invalid URL: ${url}`)
    }
  }
}*/
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const app = new Koa()
// 导入controller middleware
const controller = require('./controller')
app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`)
  await next()
})
app.use(bodyParser())
// 使用middleware
app.use(controller())
/* 经过重新整理后的工程url2-koa目前具备非常好的模块化, 所有处理URL的函数按功能组存放在controllers目录, 今后也只需要不断往这个目录下加东西就行了
* app.js保持不变
*  */
app.listen(3000)
console.log('app start at port 3000')
