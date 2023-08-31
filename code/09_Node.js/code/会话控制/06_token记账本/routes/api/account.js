const express = require('express');
const router = express.Router();
// 导入lowdb  基本不用
const AccountModel = require('../../models/AccountModel')
const moment = require('moment')
const checkTokenMiddleware = require('../../middlewares/checkTokenMiddleware')

/* 获取列表 */
router.get('/account', checkTokenMiddleware, function(req, res, next) {
  console.log(req.user)
  // 读取集合信息
  AccountModel.find().sort({time: -1}).exec((err, data) => {
    if (err) {
      res.json({
        // 响应编号
        code: '1001',
        // 响应信息
        msg: '读取失败',
        // 响应数据
        data: null
      })
      return
    }
    // 响应成功的提示  直接响应个json, 一般设置这三个响应
    res.json({
      // 响应编号
      code: '0000',
      // 响应信息
      msg: '读取成功',
      // 响应数据
      data: data
    })
  })
});

// 新增记录
router.post('/account', checkTokenMiddleware, (req, res) => {
  // 对请求体数据做细致验证, 即表单验证 (未加)
  
  // 插入数据库
  AccountModel.create({
    ...req.body,
    // 修改time属性的值
    time: moment(req.body.time).toDate()
  }, (err, data) => {
    if (err) {
      // 此时需要给个响应
      res.json({
        code: '1002',
        msg: '创建失败',
        data: null
      })
      return
    }
    res.json({
      code: '0000',
      msg: '创建成功',
      data: data
    })
  })
})

// 删除记录, 删除操作需要一个唯一标识, 通常是id
router.delete('/account/:id', checkTokenMiddleware, (req, res) => {
  // 获取params 的 id 参数
  let id = req.params.id
  // 删除
  AccountModel.deleteOne({_id: id}, (err, data) => {
    if (err) {
      res.json({
        code: '1003',
        msg: '删除失败',
        data: {}
      })
      return
    }
    // 提醒
    res.json({
      code: '0000',
      msg: '删除成功',
      data: {}
    })
    res.render('success', {msg: '删除成功', url: '/account'})
  })
})

// 获取单个账单信息
router.get('/account/:id', checkTokenMiddleware, (req, res) => {
  let {id} = req.params
  AccountModel.findById(id, (err, data) => {
    if (err) {
      return res.json({
        code: '1004',
        msg: '读取失败',
        data: null
      })
    }
    // 成功响应
    res.json({
      code: '0000',
      msg: '读取成功',
      data: data
    })
  })
})

// 更新单个账单信息
router.patch('/account/:id', checkTokenMiddleware, (req, res) => {
  let {id} = req.params
  // 更新数据库
  AccountModel.updateOne({_id: id}, req.body, (err, data) => {
    if (err) {
      return res.json({
        code: '1005',
        msg: '更新失败',
        data: null
      })
    }
    // 再次查询数据库获取单条数据  但是这样形成回调地狱, 可用Promise解决
    AccountModel.findById(id, (err, data) => {
      if (err) {
        return res.json({
          code: '1004',
          msg: '读取失败',
          data: null
        })
      }
      // 成功响应
      res.json({
        code: '0000',
        msg: '读取成功',
        data: data
      })
    })
  })
})

module.exports = router;
