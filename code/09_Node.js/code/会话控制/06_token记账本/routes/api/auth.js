var express = require('express');
const jwt = require('jsonwebtoken')
var router = express.Router();
const UserModel = require('../../models/UserModel')
const md5 = require('md5')
// 读取配置项
const {secret} = require('../../config/config')

// 登录操作
router.post('/login', (req, res) => {
  // 查询数据库, 检测用户的输入内容在数据库中有没有匹配记录
  // 获取用户名和密码
  let {username, password} = req.body
  UserModel.findOne({username: username, password: md5(password)}, (err, data) => {
    if (err) {
      res.json({
        code: '2001',
        msg: '数据读取失败',
        data: null
      })
      return
    }
    // 判断data
    if (!data) {
      return res.json({
        code: '2002',
        msg: '用户名或密码错误',
        data: null
      })
    }
    
    // 创建token
    let token = jwt.sign({
      username: data.username,
      _id: data._id,
    }, secret, {
      expiresIn: 60 * 60 * 24 * 7
    })
    
    // 响应token
    res.json({
      code: '0000',
      msg: '登录成功',
      data: token
    })
    
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
