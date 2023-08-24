const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const controller = require('./controller')
const templating = require('./templating')
const isProduction = process.env.NODE_ENV === 'production'
const app = new Koa()

app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`)
  let
    start = new Date().getTime(),
    execTime
  await next()
  execTime = new Date().getTime() - start
  ctx.response.set('X-Response-Time', `${execTime}ms`)
})

if (!isProduction) {
  // 使用middleware
  let staticFiles = require('./static-files')
  // __dirname用来动态获取当前文件模块所属目录的绝对路径
  app.use(staticFiles('/static/', __dirname + '/static'))
}
app.use(bodyParser())
app.use(templating('views', {
  noCache: !isProduction,
  watch: !isProduction
}))
app.use(controller())
app.listen(3000)
console.log('app started at port 3000')
/* 这里定义了一个常量isProduction, 它判断当前环境是否是production环境, 如果是就使用缓存, 如果不是就关闭缓存, 在开发环境下, 关闭缓存后修改View,
* 可以直接刷新浏览器看到效果, 否则每次修改都必须重启Node程序, 会极大降低开发效率 */
/* Node.js在全局变量process中定义了一个环境变量env.NODE_ENV, 为什么要使用该环境变量? 因为开发时环境变量应当设置为development, 而部署到服务器时,
* 环境变量应该设置为production, 在编写代码时要根据当前环境作不同的判断
*  注意:
*   生产环境上必须配置环境变量NODE_ENV='production', 而开发环境不需要配置, 实际上NODE_ENV可能是undefined, 所以判断的时候不要用NODE_ENV === 'development'
*   类似的, 在使用上面编写的处理静态文件的middleware时, 也可以根据环境变量判断:
*   if (!isProduction) {
*     let staticFiles = require('./static-files')
*     app.use(staticFiles('/static/', __dirname + '/static'))
*   }
*   这是因为在生产环境下, 静态文件是由部署在最前面的反向代理服务器处理的, Node程序不需要处理静态文件, 而在开发环境下, 我们希望koa能顺带处理静态文件,
* 否则就必须手动配置一个反向代理服务器, 这样会导致开发环境十分复杂
*  */
