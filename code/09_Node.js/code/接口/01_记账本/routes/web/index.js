var express = require('express');
var router = express.Router();
const AccountModel = require('../../models/AccountModel')
const moment = require('moment')
// 导入中间件检测登录
const checkLoginMiddleware = require('../../middlewares/checkLoginMiddleware')

/* 记账本的列表 */
router.get('/account', checkLoginMiddleware, function(req, res, next) {
  // let accounts = db.get('accounts').value()
  // 读取集合信息
  AccountModel.find().sort({time: -1}).exec((err, data) => {
    if (err) {
      res.status(500).send('读取失败')
      return
    }
    // 响应成功的提示  此处可以将moment传入ejs
    res.render('list', { accounts: data, moment });
  })
});

router.get('/account/create', checkLoginMiddleware,  function(req, res, next) {
  res.render('create');
});

// 新增记录
router.post('/account', checkLoginMiddleware, (req, res) => {
  // 插入数据库
  AccountModel.create({
    ...req.body,
    // 修改time属性的值
    time: moment(req.body.time).toDate()
  }, (err, data) => {
    if (err) {
      // 此时需要给个响应
      res.status(500).send('插入失败')
      return
    }
    res.render('success', {msg: '添加成功', url: '/account'})
  })
})

// 删除记录, 删除操作需要一个唯一标识, 通常是id
router.get('/account/:id', checkLoginMiddleware, (req, res) => {
  // 获取params 的 id 参数
  let id = req.params.id
  // 删除
  AccountModel.deleteOne({_id: id}, (err, data) => {
    if (err) {
      res.status(500).send('删除失败')
      return
    }
    // 提醒
    res.render('success', {msg: '删除成功', url: '/account'})
  })
})

module.exports = router;
