const express = require('express')
// 创建路由对象
const router = express.Router()
// 创建路由规则
// 创建路由
router.get('/admin', (req, res) => {
  res.send('后台首页')
})

router.get('/setting', (req, res) => {
  res.send('设置页面')
})

// 暴露router
module.exports = router
