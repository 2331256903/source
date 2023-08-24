/* 集成Nunjucks */
/* 集成Nunjucks实际上也是编写一个middleware, 这个middleware的作用是给ctx对象绑定一个render(view, model)的方法, 这样后面的Controller
* 就可以调用这个方法来渲染模板 */
const nunjucks = require('nunjucks')
function createEnv(path, opts) {
  var
    autoescape = opts.autoescape === undefined ? true : opts.autoescape,
    noCache = opts.noCache || false,
    watch = opts.watch || false,
    throwOnUndefined = opts.throwOnUndefined || false,
    env = new nunjucks.Environment(
      new nunjucks.FileSystemLoader(path, {
        noCache: noCache,
        watch: watch,
      }), {
        autoescape: autoescape,
        throwOnUndefined: throwOnUndefined
      });
  if (opts.filters) {
    for (let f in opts.filters) {
      env.addFilter(f, opts.filters[f]);
    }
  }
  return env;
}

function templating(path, opts) {
  // 创建Nunjucks的env对象
  let env = createEnv(path, opts)
  return async (ctx, next) => {
    // 给ctx绑定render函数
    ctx.render = function (view, model) {
      // 把render后的荣赋值给response.body
      ctx.response.body = env.render(view, Object.assign({}, ctx.state || {}, model || {}))
      // 设置Content-Type
      ctx.response.type = 'text/http'
    }
    // 继续处理请求
    await next()
  }
}

module.exports = templating

/* 注意到createEnv()函数和他前面使用Nunjucks时编写的函数是一样的, 我们主要关心templating()函数, 它会返回一个middleware, 在这个middleware中
* 我们只给ctx安装了一个render()函数, 其他什么事情也没干, 就继续调用下一个middleware */
