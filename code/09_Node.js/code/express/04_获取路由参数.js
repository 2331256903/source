/**
 * 路由参数指的是URL路径里的参数(数据)
 * app.get('/:id.html', (req, res) => {
 *   res.send('商品详情, 商品id为' + req.params.id)
 * })
 * */
const express = require('express')
const app = express()

// :id 占位符 路由传参 然后对id参数做一个通配
app.get('/:id.html', (req, res) => {
  // 获取 URL 路由参数  params后的参数名字要和占位符一致
  console.log(req.params.id)
  res.setHeader('content-type', 'text/html;charset=utf-8')
  res.end('商品详情')
})

app.listen(3000, () => {
  console.log('服务已经启动, 端口3000监听中....')
})
