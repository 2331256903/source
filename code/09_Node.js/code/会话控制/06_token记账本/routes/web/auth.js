var express = require('express');
var router = express.Router();
const UserModel = require('../../models/UserModel')
const md5 = require('md5')

router.get('/reg', (req, res) => {
  // 响应HTML内容  到views文件夹下找对应文件
  res.render('auth/reg')
})

// 注册
router.post('/reg', (req, res) => {
  // 做表单验证
  // 获取请求体的数据
  UserModel.create({...req.body, password: md5(req.body.password)}, (err, data) => {
    if (err) {
      res.status(500).send('注册失败')
      return
    }
    res.render('success', {msg: '注册成功', url: '/login'})
  })
})

// 登录页面
router.get('/login', (req, res) => {
  res.render('auth/login')
})

// 登录操作
router.post('/login', (req, res) => {
  // 查询数据库, 检测用户的输入内容在数据库中有没有匹配记录
  // 获取用户名和密码
  let {username, password} = req.body
  UserModel.findOne({username: username, password: md5(password)}, (err, data) => {
    if (err) {
      res.status(500).send('登录失败')
      return
    }
    // 判断data
    if (!data) {
      return res.send('账号或密码错误')
    }
    // 写入session
    req.session.username = data.username
    req.session._id = data._id
    
    // 登录成功响应
    res.render('success', {msg: '登录成功', url: '/account'})
  })
})

// 退出登录
router.post('/logout', (req, res) => {
  // 销毁session
  req.session.destroy(() => {
    res.render('success', {msg: '退出成功', url: '/login'})
  })
})

module.exports = router;
