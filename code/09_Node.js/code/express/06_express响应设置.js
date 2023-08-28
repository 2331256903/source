/**
 * express框架封装了一些API来方便给客户端响应数据, 并且兼容原生HTTP模块的获取方式
 * */
// 获取请求的路由规则
const express = require('express')
const app = express()

app.get('/response', (req, res) => {
  // 原生响应
  /*res.statusCode = 404
  res.statusMessage = 'love'
  res.setHeader('xxx', 'yyy') // 设置响应头
  res.write('hello express') // 设置响应体
  res.end('response')*/
  
  // express响应
  /*res.status(500)
  res.set('aaa', 'bbb') // 设置响应头
  res.send('你好 express') // 设置响应体*/
  /* 此处中文没有乱码, express的send方法会自动在响应头中添加字符集的设置 */
  // 且可以链式调用
  res.status(500).set('bbb', 'ccc').send('你好 express')
  
  // 其他响应
  res.redirect('https://atguigu.com') // 重定向
  res.download('./package.json') // 下载响应
  res.json() // 响应json
  res.sendFile(__dirname + '/home.html')
})

app.listen(3000, () => {
  console.log('服务已经启动, 端口3000监听中....')
})
