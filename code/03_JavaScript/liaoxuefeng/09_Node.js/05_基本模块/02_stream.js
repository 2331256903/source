/*
*   stream是Node.js提供的仅在服务器端可用的模块, 目的是支持'流'这种数据结构
*   流是一种抽象的数据结构, 数据看做数据流, 每个字符依次连接, 看做字符流, 对应名字: 标准输入流(stdin)
*   同理还有标准输出流(stdout), 在Node.js中, 流也是一个对象, 我们只需要相应流的事件就可以了, data事件表示流的数据已经可以读取了, end事件表示这个流已经到
* 末尾了, 没有数据可以读取了, error事件表示出错了
* */
// 从一个文件流读取文本内容
let fs = require('fs')
let rs = fs.createReadStream('simple.txt', 'utf-8')
rs.on('data', function (chunk) {
  console.log('Data:')
  console.log(chunk)
})
rs.on('error', function (err) {
  console.log('ERROR:' + err)
})
rs.on('end', function () {
  console.log('END')
})
/*
* 注意: data事件可能会有多次, 每次传递chunk是流的一部分数据
*   要以流的形式写入文件, 只需要不断调用write()方法, 最后以end()结束
* */
let ws1 = fs.createWriteStream('output.txt', 'utf-8')
ws1.write('使用Stream写入文本数据...\n')
ws1.write('END')
ws1.end()

let ws2 = fs.createWriteStream('output2.txt')
ws2.write(new Buffer('使用Stream写入二进制数据...\n', 'utf-8'))
ws2.write(new Buffer('END', 'utf-8'))
ws2.end()
/* 所有可读取数据的流都继承自stream.Readable, 所有可以写入的流都继承自stream.Writable */

/* pipe */
/*  类似将两个水管串成一个更长的水管, 两个流也可以串起来, 一个Readable流和一个Writable流串起来后, 所有的数据自动从Readable进入Writable流,
* 这种操作叫pipe
*   在Node.js中, Readable流有一个pipe()方法, 可以将一个文件流和另一个文件流串起来, 这样源文件的所有数据就自动写入到目标文件里了, 所以这实际上是个复制文件的程序
*/
let rs3 = fs.createReadStream('simple.txt')
let ws3 = fs.createWriteStream('copied.txt')
rs3.pipe(ws3)
/* 默认情况下, 当Readable流的数据读取完毕, end事件触发后, 将自动关闭Writable流, 如果我们不希望自动关闭Writable流, 需要传入参数 */
// readable.pipe(writeable, { end: false })
