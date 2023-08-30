/**
 * session 是保存在服务器端的一块数据, 保存当前访问用户的相关信息
 * 作用:
 *   实现会话控制, 可以识别用户的身份, 从而快速获取当前用户的相关信息
 * 运行流程:
 *     浏览器填写账号和密码发送给服务器, 服务器校验通过后服务器创建session对象, 保存session信息, 同时也生成一个独一无二的用户标识session_id,
 *   后续将session_id的值通过响应头返回给浏览器
 *     浏览器有了cookie, 下次发送请求时会自带cookie, 服务器通过cookie中的session_id的值确定用户身份
 * */

/**
 * session中间件的操作
 *   express-session  connect-mongo
 * */
const express = require('express')
// 引入 express-session  connect-mongo
const session = require('express-session')
const MongoStore = require('connect-mongo')

const app = new express()
// 设置session的中间件
app.use(session({
  name: 'sid', // 设置cookie的name, 默认值是 connect.sid
  secret: 'atguigu', // 参与加密的字符串(又称签名) 加盐  提高安全等级
  saveUninitialized: false, // 是否为每次请求都设置一个cookie用来存储session的id, 即没有传session也创建session对象  如果想对匿名用户信息进行记录可以设置为true
  resave: true, // 是否在每次请求时重新保存session  session保存时间刷新
  store: MongoStore.create({
    mongoUrl: 'mongodb://127.0.0.1:27017/bilibili' // 数据库的连接配置
  }),
  cookie: {
    httpOnly: true, // 只作传输使用 开启后前端浏览器无法通过JS访问和操作cookie  document.cookie
    maxAge: 1000 * 60 * 5 // 控制sessionID的过期时间
  }
}))

app.get('/', (req, res) => {
  res.send('home')
})

// 登录 session 的设置
app.get('/login', (req, res) => {
  if (req.query.username === 'admin' && req.query.password === 'admin') {
    // 设置session信息
    req.session.username = 'admin'
    req.session.uid = '258aefccc'
    // 成功响应
    res.send('登录成功')
  } else {
    res.send('登录失败')
  }
})

// session的读取
app.get('/cart', (req, res) => {
  // 判断当前用户是否登录:  检测是否存在用户数据
  // 这一步中间件已经自动获取session信息 自动查询数据库 自动填写到req.session中了 不需要手动获取session信息
  if (req.session.username) {
    res.send(`欢迎宁 ${req.session.username}`)
  } else {
    res.send('未登录')
  }
})

// session 的销毁
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    req.send('退出成功')
  })
})

app.listen(3000)
