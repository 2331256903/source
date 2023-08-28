var express = require('express');
var router = express.Router();

/* GET users listing. */
// 外部写了users了, 这里的/实际上是 /users
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/test', function(req, res, next) {
  res.send('用户测试');
});

module.exports = router;
