// 1.引入 fs 模块
const fs = require('fs')

// 2. 调用 appendFile 参数和writeFile一致
fs.appendFile('./座右铭.txt', ',择其善者而从之,其不善者而改之', err => {
  if (err) {
    console.log('追加写入失败')
    return
  }
  console.log('追加写入成功')
})

// 同步操作
fs.appendFileSync('./座右铭.txt', '\r\n稳固而知新, 可以为师矣') // \r\n换行

// writeFile 实现追加写入 第三个参数 {flag: 'a'} 此处flag可选值: w(默认): 写入模式,会覆盖写入; a: 追加模式; r: 读取模式
fs.writeFile('./座右铭.txt', 'love love love', {flag: 'a'}, err => {
  if (err) {
    console.log('追加写入失败')
    return
  }
  console.log('追加写入成功')
})
