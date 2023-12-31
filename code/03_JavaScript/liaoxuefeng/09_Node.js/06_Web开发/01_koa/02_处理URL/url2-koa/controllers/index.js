let fn_index = async (ctx, next) => {
  ctx.response.body = `
    <h1>Index</h1>
    <form action="/signin" method="post">
      <p>Name: <input name="name" value="koa"></p>
      <p>Password: <input name="password" type="password"></p>
      <p><input type="submit" value="Submit"></p>
    </form>
  `
}

let fn_signin = async (ctx, next) => {
  let
    name = ctx.request.body.name || ''
    password = ctx.request.body.password || ''
  console.log(`sign with name: ${name}, password: ${[password]}`)
  if (name === 'koa' && password === '12345') {
    ctx.response.body = `<h1>Welcome, ${name}</h1>`
  } else {
    ctx.response.body = `
      <h1>Login failed!</h1>
      <p><a href="/">Try again</a></p>
    `
  }
}

module.exports = {
  'GET /': fn_index,
  "POST /signin": fn_signin
}
/* 这个index.js通过module.exports把两个URL处理函数暴露出来
* 类似的, hello.js把一个URL处理函数暴露出来
* */
