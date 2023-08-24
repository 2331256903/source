const fs = require('fs')
// 相对路径
  fs.writeFileSync('./index.http', 'love')
  // 不写./默认在当前文件夹下创建
  fs.writeFileSync('index.http', 'love')

// 绝对路径 此时路径没有问题, 但是写C盘权限不够
  fs.writeFileSync('C:/index.http', 'love')

// __dirname 可以理解为全局变量, 这个变量始终保存的是 __dirname所在的文件所在目录的绝对路径
console.log(__dirname)
fs.writeFileSync(__dirname + '/index.http', 'love')
/* __dirname不会随着工作目录的变化而变化, 因此后续fs操作时都会加上__dirname, 避免因为工作目录变化导致的程序运行变化 */
