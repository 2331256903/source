/* 异步写入 */

/* 当代码执行到writeFile时, 将磁盘写入(I/O)操作交给另外的线程完成, 此时有两个线程: js的主线程,来执行解析js代码, 另一个是I/O线程
*    而此时writeFile方法是异步的, 不会等待执行结果返回, 而是直接向后运行代码, 而I/O线程写入完毕后将回调函数压入任务队列中, 等js主线程执行完初始化代码后
*    ,再从任务队列中取出回调函数再进行执行
* */

const fs = require('fs')
fs.writeFile('./座右铭.txt', '三人行, 则必有我师焉', err => {
  if (err) {
    console.log('写入失败')
    return
  }
  console.log('写入成功')
})

console.log(1 + 1) // 此处先输出2 再输出err


/* 同步写入 */
fs.writeFileSync('./data.txt', 'test') // 此时执行到此处时主线程停止, 等待写操作结束后返回结果, 然后主线程再执行, 效率较低

