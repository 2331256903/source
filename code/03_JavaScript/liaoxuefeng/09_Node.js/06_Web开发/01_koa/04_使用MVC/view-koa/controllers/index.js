/* 处理首页 GET/
* 定义一个async函数处理首页URL/
* */
module.exports = {
  'GET /': async (ctx, next) => {
    ctx.render('index.http', {
      title: 'Welcome'
    })
  }
}
/* 注意到koa并没有在ctx对象上提供render方法, 假设先这么使用, 这样编写Controller的时候, 最后一步调用ctx.render(view, model)就完成了页面输出 */
