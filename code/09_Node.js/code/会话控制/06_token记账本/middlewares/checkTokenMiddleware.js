const jwt = require('jsonwebtoken')
// 读取配置项
const {secret} = require('../config/config')

module.exports = (req, res, next) => {
  // 校验token
  let token = req.get('token')
  if (!token) {
    return res.json({
      code: '2003',
      msg: 'token缺失',
      data: null
    })
  }
  jwt.verify(token, secret, (err, data) => {
    // 检测token是否正确
    if (err) {
      return res.json({
        code: '2004',
        msg: 'token校验失败',
        data: null
      })
    }
    // 保存用户信息
    /* 记账本供多用户使用时需要保存用户信息, 中间件获取信息后回调给网页 */
    req.user = data
  })
  // 如果token校验成功
  next()
}
