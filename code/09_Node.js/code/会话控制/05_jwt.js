/**
 * JWT (JSON Web Token) 是目前最流行的跨域认证解决方案, 可用于基于token的身份验证
 * JWT使token的生成与校验更规范
 * */
// 使用jsonwebtoken包来操作token
// 导入jwt
const jwt = require('jsonwebtoken')
// 创建token
// let token = jwt.sign(用户数据, 加密字符串, 配置对象可以设置生命周期)
/*let token = jwt.sign({
  username: 'zhangsan'
}, 'atguigu',{
  expiresIn: 60, // 单位是秒
})

console.log(token)*/

// 校验token
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InpoYW5nc2FuIiwiaWF0IjoxNjkzNDQ2MjI0LCJleHAiOjE2OTM0NDYyODR9.NjfaYjw6ie25UKd2BP6uRVs2pDTEe_Bjp4y9fNViW90'
jwt.verify(token, 'atguigu', (err, data) => {
  if (err) {
    console.log('校验失败')
    return
  }
  console.log(data) // 用户名 创建时间 过期时间
})
