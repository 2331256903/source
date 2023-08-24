const fs = require('fs')
// 创建文件夹 mk (make的缩写, 文件制作)  dir (directory的缩写 文件夹)
fs.mkdir('./http', err => {
  if (err) {
    console.log('创建失败')
    return
  }
  console.log('创建成功')
})

// 递归创建
fs.mkdir('./a/b/c', { recursive: true }, err => {
  if (err) {
    console.log('创建失败')
    return
  }
  console.log('创建成功')
})

// 读取文件夹 read 读取  得到目标文件夹中资源的名称构成的数组
fs.readdir('./', (err, data) => {
  if (err) {
    console.log('读取失败')
    return
  }
  console.log(data)
})


// 删除文件夹 rm  remove 移除
fs.rmdir('./http', err => {
  if (err) {
    console.log('删除失败')
    return
  }
  console.log('删除成功')
})

/* 同理, 递归删除 建议使用rm, 因为后续版本rmdir将弃用
fs.rm('./a', {recursive}, err => {
  if (err) {
    console.log('删除失败')
    return
  }
  console.log('删除成功')
})

*/
