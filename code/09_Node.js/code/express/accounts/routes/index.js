var express = require('express');
var router = express.Router();
// 导入lowdb  基本不用
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync(__dirname + '/../data/db.json')
// 获取db对象
const db = low(adapter)
// 导入shortid
const shortid = require('shortid')

/* GET home page. */
router.get('/account', function(req, res, next) {
  let accounts = db.get('accounts').value()
  res.render('list', { accounts });
});

router.get('/account/create', function(req, res, next) {
  res.render('create');
});

// 新增记录
router.post('/account', (req, res) => {
  // 生成id
  let id = shortid.generate()
  // 写入文件 通常从前面开始添加
  db.get('accounts').unshift({ id: id, ...req.body }).write()
  res.render('success', {msg: '添加成功', url: '/account'})
})

// 删除记录, 删除操作需要一个唯一标识, 通常是id
router.get('/account/:id', (req, res) => {
  // 获取params 的 id 参数
  let id = req.params.id
  // 删除
  db.get('accounts').remove({id:id}).write()
  // 提醒
  res.render('success', {msg: '删除成功', url: '/account'})
})

module.exports = router;
