const fs = require('fs')
// stat方法 status缩写 状态
fs.stat('./test/01_download.js', (err, data) => {
  if (err) {
    console.log('操作失败')
    return
  }
  console.log(data)
  console.log(data.isFile()) // 判断是不是文件
  console.log(data.isDirectory()) // 判断是不是目录
})
