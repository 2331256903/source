var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/web/index');
// 导入 account 路由接口文件
const accountRouter = require('./routes/api/account')
const authRouter = require('./routes/web/auth')
const authApiRouter = require('./routes/api/auth')
// 导入express-session 和 connect-mongo
const session = require("express-session");
const MongoStore = require("connect-mongo");

const {DBHOST, DBPORT, DBNAME} = require('./config/config')
var app =  express()

// 设置session的中间件
app.use(session({
  name: 'sid', // 设置cookie的name, 默认值是 connect.sid
  secret: 'atguigu', // 参与加密的字符串(又称签名) 加盐  提高安全等级
  saveUninitialized: false, // 是否为每次请求都设置一个cookie用来存储session的id, 即没有传session也创建session对象  如果想对匿名用户信息进行记录可以设置为true
  resave: true, // 是否在每次请求时重新保存session  session保存时间刷新
  store: MongoStore.create({
    mongoUrl: `mongodb://${DBHOST}:${DBPORT}/${DBNAME}` // 数据库的连接配置
  }),
  cookie: {
    httpOnly: true, // 只作传输使用 开启后前端浏览器无法通过JS访问和操作cookie  document.cookie
    maxAge: 1000 * 60 * 60 * 24 * 7 // 控制sessionID的过期时间
  }
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/api', accountRouter);
app.use('/api', authApiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // 响应404
  res.render('404')
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
