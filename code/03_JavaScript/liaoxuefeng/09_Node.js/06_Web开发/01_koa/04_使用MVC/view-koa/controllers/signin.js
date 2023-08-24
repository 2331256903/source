/* 处理登录请求POST /signin */
module.exports = {
  'POST /signin': async (ctx, next) => {
    let
      email = ctx.request.body.email || '',
      password = ctx.request.body.password || ''
    console.log(email)
    console.log(password)
    if (email === 'admin@example.com' && password === '123456') {
      // 登录成功
      console.log(1)
      ctx.render('signin-ok.http', {
        title: 'Sign In OK',
        name: 'Mr Node'
      })
    } else {
      // 登录失败
      console.log(2)
      ctx.render('signin-failed.http', {
        title: 'Sign In Failed'
      })
    }
  }
}

/* 由于登录请求是一个POST, 使用ctx.request.body.<name>拿到POST请求的数据, 并给一个默认值
* 登录成功时用signin-ok.html渲染,登录失败时用signin-failed.html渲染, 所以一共需要以下3个view
*   index.http
*   signin-ok.http
*   signin-failed.http
* */
