const fs = require('fs')
// 方法一: 调用unlink方法 同理unlinkSync
fs.unlink('./观书有感.txt', err => {
  if (err) {
    console.log('删除失败')
    return
  }
  console.log('删除成功')
})


// 方法二: 调用rm方法, Node 14.4版本引入的新方法 同理rmSync
/*fs.rm('./论语.txt'. err => {
  if (err) {
    console.log('删除失败')
    return
  }
  console.log('删除成功')
})*/
