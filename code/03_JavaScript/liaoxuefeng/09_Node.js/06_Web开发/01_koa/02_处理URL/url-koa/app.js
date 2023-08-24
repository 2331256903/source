/* 在hello-koa工程中, 我们处理http请求一律返回相同的HTML, 这样虽然非常简单, 但是用浏览器的一侧2随便输入任何url都会返回相同的网页
* 而正常情况下我们应该对不同的URL调用不同的处理函数, 这样才能返回不同的结果, 例如: */
/*const Koa = require('koa')
const P = require("../../../../../../../study/8-8/axios.min");
let app = new Koa()

app.use(async (ctx, next) => {
  if (ctx.request.path === '/') {
    ctx.response.body = 'index page'
  } else {
    await next()
  }
})
app.use(async (ctx, next) => {
  if (ctx.request.path === '/test') {
    ctx.response.body = 'TEST page'
  } else {
    await next()
  }
})
app.use(async (ctx, next) => {
  if (ctx.request.path === '/error') {
    ctx.response.body = 'ERROR page'
  } else {
    await next()
  }
})*/
/* 这么写也是可行的, 但是有点蠢, 应该有一个能集中处理URL的middleware, 它根据不同的URL调用不同的处理函数, 这样我们才能专心为每个URL编写处理函数 */
/* koa-router */
/* 为了处理URL, 我们需要引入koa-router这个middleware, 让他负责处理URL映射, 把上一节的koa-router工程复制一份, 让它负责处理URL映射 */
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
// 注意require('koa-router')返回的是函数
/*
* require函数是一种运行时同步加载的机制(拷贝该文件), 当Node加载该文件后会有一个require.cache函数对该文件进行缓存, 同时Node不支持热更新
* */
const router = require('koa-router')()

const app = new Koa()
app.use(bodyParser())

// log request URL
/*app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`)
  await next()
})
// add url-route
router.get('/hello/:name', async (ctx, next) => {
  let name = ctx.params.name
  ctx.response.body = `<h1>Hello, ${ name }</h1>`
})
router.get('/', async (ctx, next) => {
  ctx.response.body = '<h1>Index</h1>'
})*/
// add router middleware
app.use(router.routes())
app.listen(3000)
console.log('app started at port 3000...')
/*
* 注意导入koa-router的语句最后的()是函数调用
*   const router = require('koa-router')()
* 效果等同于:
*   const fn_router = require('koa-router')
*   const router = fn.router()
* */
/*
* 然后使用router.get('/path', async fn) 来注册一个GET请求, 可以在请求路径中使用带变量的/hello/:name, 变量可以通过ctx.params.name访问
* 再运行app.js, 就可以测试不同的URL
* */


/* 处理post请求 */
/* 用router.get('/path', async fn)处理的是get请求, 如果要处理post请求, 可以用router.post('/path', async fn)
*  使用post请求处理URL时, 会遇到一个问题: post请求通常会发送一个表单, 或者JSON, 它作为request的body发送, 但是无论是Node.js提供的原始request
* 对象, 还是koa提供的request对象, 都不提供解析request的body的功能
*  所以又要引入另一个middleware来解析原始的request请求, 然后把解析后的参数绑定到ctx.request.body中
*  koa-bodyparser就是用来干这个活的
* */
// 引入koa-bodyparser
/*const bodyParser = require('koa-bodyparser')
app.use(bodyParser())*/
/* 由于middleware的顺序很重要, 这个koa-bodyparser必须在router之前被注册到app对象上 */
// 现在可以处理post请求了, 写一个简单的登录表单
router.get('/', async (ctx, next) => {
  ctx.response.body= `
    <h1>Index</h1>
    <form action="/signin" method="post">
      <p>Name: <input name="name" value="koa"></p>
      <p>Password: <input name="password" type="password"></p>
      <p><input type="submit" value="Submit"></p>
    </form>
  `
})
router.post('/signin', async (ctx, next) => {
  let
    name = ctx.request.body.name || ''
    password = ctx.request.body.password || ''
  console.log(`signin with name: ${name}, password: ${password}`)
  if (name === 'koa' && password === '12345') {
    ctx.response.body = `<h1>Welcome, ${name}!</h1>`
  } else {
    ctx.response.body = `
      <h1>Login failed!</h1>
      <p><a href="/">Try again</a></p>
    `
  }
})


/* 重构 */
/* 现在已经可以处理不同的URL了, 但是看看app.js依旧不对劲, 所有的URL处理函数都放到app.js里显得很乱, 而且每加一个URL, 就需要修改app.js, 随着URL越来越多
* ,app.js就会越来越长
*  如果能把URL处理函数集中到某个js文件, 或者某几个js文件中就好了, 然后让app.js自动导入所有处理URL的函数, 这样代码一分离, 逻辑就显得清楚了
*  像这样:
*   url2-koa/
*   |
*   +-.vscode/
*   | |
*   | +- launch.json  // VSCode配置文件
*   |
*   +- controllers/
*   | |
*   | +- login.js // 处理login相关url
*   | |
*   | +- users.js // 处理用户管理相关url
*   |
*   +- 使用Nunjucks.js // 使用koa的js
*   |
*   +- package.json // 项目描述文件
*   |
*   +- node_modules/ // npm安装的所有依赖包
* 于是将url-koa复制一份, 重构这个项目
* */
