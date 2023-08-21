/* koi是Express的下一代基于Node.js的框架 */
/* 1.Express 是第一代最流行的web框架, 对Node.js的http进行了封装 */
let express = require('express')
let fs = require('fs')
let app = express()
app.get('/', function (req, res) {
  res.send('Hello World')
})
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
/* 虽然Express的API很简单, 但是它基于ES5的语法, 要实现异步代码, 只有一个方法, 回调; 如果异步嵌套层次过多会产生回调地狱 */
app.get('/test', function (req,res) {
  fs.readFile('/file1', function (err, data) {
    if (err) {
      res.status(500).send('read file1 error')
    }
    fs.readFile('/file2', function (err, data) {
      if (err) {
        res.status(500).send('read file2 error')
      }
      res.type('text/plain')
      res.send(data)
    })
  })
})
/* 虽然可以用async这样的库来组织异步代码, 但是用回调写异步太麻烦了 */


/* 随着新版Node.js开始支持ES6, Express的团队又基于ES6的generator重新编写了下一代web框架koa, 和Express相比, koa1.0使用generator实现异步
* ,代码看起来像同步的
* */
let koa = require('koa')
let app2 = koa()
app2.use('/test', function *() {
  yield doReadFile1()
  this.body = yield doReadFile2()
})
app2.listen(3000)
/* 使用generator实现异步比回调简单了不少, 但是generator的本意不是异步, Promise才是为异步设计的, 为了简化异步代码, JS引入了新的关键字async和await
* 可以轻松地把一个function变为异步模式, 下面是标准的异步代码, 简洁且易于使用 */
async function asyncFunc() {
  let data = await fs.read('/file1')
}


/* koa2, 完全使用Promise并配合async来实现异步 */
/*app.use(async (ctx, next) => {
  await next()
  let data = await doReadFile()
  ctx.response.type = 'text/plain'
  ctx.response.body = data
})*/


/* koa洋葱模型 */
/* 中间件执行两次, 执行顺序以next函数为分界点, 先use的中间件, next前的逻辑先执行, 但是next后的逻辑后执行 */
/* Express的中间件事顺序执行, 从第一个中间件执行到最后一个中间件, 发出响应, Koa是从第一个中间件开始执行, 遇到await next() 就进入下一个中间件,
* 一直执行到最后一个中间件, 再逆序执行上一个中间件await next()后面的代码, 一直到第一个中间件await next()后面的代码执行完毕才发出响应
* */
/*  koa把很多async函数组成一个处理链, 每个async函数都可以做一些自己的事情, 然后用await next()来调用下一个async函数, 每个async函数称为middleware,
* 这些middleware可以组合起来, 完成很多有用的功能
* */
