/* 使用koa处理不同的url, 使用Nunjucks渲染模版, 现在结合两者 */
/* 当用户通过浏览器请求一个URL时, koa将调用某个异步函数处理该URL, 在这个异步函数内部用一行代码:
*   ctx.render('home.http', { name: 'Michael' })
*  通过Nunjucks把数据用制定的模板渲染成HTML, 然后输出给浏览器, 用户就可以看到渲染后的页面了:
*   浏览器请求 GET /Michael ==> app.js将变量{{name}}替换为Michael ==> 模板输出 ===> 用户看到正确的界面
*   就是Model-View-Controller, 模型-视图-控制器
*   其中, 异步函数是C, Controller负责业务逻辑, 比如检查用户名是否存在, 取出用户信息等等; 包含变量 {{name}}的模板就是V, View负责显示逻辑,
*  通过简单地替换一些变量, View最终输出的就是用户看到的HTML; Model 是用来传给View的, 这样View在替换变量的时候就可以从Model中取出相应的数据,
*  比如一个JS对象{name: 'Michael'}就是Model
* */
/* 根据url2-koa创建工程view-koa, 把koa2, Nunjucks整合起来, 然后把原来直接输出字符串的方式改为ctx.render(view, model)的方式 */

/* 扩展 */
/*  ctx.render内部渲染模版时, Model对象并不是传入的model变量, 而是object.assign({}, ctx.state || {}, model || {})
*   这个小技巧是为了扩展
*   首先, model || {}确保了即使传入undefined, model也会变成默认值{}
*   object.assign() 会把除第一个参数外的其他参数的所有属性复制到第一个参数中, 第二个参数是ctx.state || {}, 这个目的是为了能把一些公共的变量放入
* ctx.state并传给View
*   例如某个middleware负责检测用户权限, 它可以把当前用户放入ctx.state中
* */
app.use(async (ctx, next) => {
  let user = tryGetUserFromCookie(ctx.request)
  if (user) {
    ctx.state.user = user
    await next ()
  } else {
    ctx.response.status = 403
  }
})
/* 这样就没有必要在每个Controller的async函数中都把user变量放入model中了 */

/* JS Web框架 */
/*
* 按app.js的顺序
*   记录中间件
*   加载静态资源中间件
*   request post内容解析中间件
*   模板加载中间件
*   路由中间件
*   mvc由静态, 模板, 路由 三个中间件组成
*   静态中间件是解析request中的path里的有html的header确定的静态资源路径, 并将静态资源对接到response的响应体上
*   模版中间件配置了模板使用环境, 模板资源路径, 以及定义了模板引用方法
*   路由中间件注册了针对了每个api和url的响应函数, 负责对request进行引导, 里面注册的响应函数在对request处理后引用模板输出响应
* */
