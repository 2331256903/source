/* Node.js内置的fs模块就是文件系统模块, 负责读写文件 */
/* 与其他JS模块不同的是, fs模块同时提供了异步和同步方法:
*   JS为单线程模型, 执行异步IO操作时JS代码无需等待, 而是传入回调函数后继续执行JS代码, 比如jQuery提供的getJSON操作
* */
/*$.getJSON('http://example.com/ajax', function(data) {
  console.log('IO结果返回后执行...')
})
console.log('不等待IO结果直接执行后续代码...')*/
/* 而同步的IO操作则需要等待函数返回, 根据网络耗时, 函数将执行几十毫秒到几秒不等*/
/*var data = getJSONSync('http://example.com/ajax')*/
/* 同步操作的好处是代码简单, 缺点是程序将等待IO操作, 在等待时间内无法相应其他任何事件, 而异步操作相反 */

/* 异步读文件 */
var fs = require('fs')
fs.readFile('simple.txt', 'utf-8', function(err, data) {
  if (err) {
    console.log(err)
  } else {
    console.log(data)
  }
})
/* 异步读取时, 传入的回调函数接收两个参数, 当读取正常时, err参数为null, data参数为读取到的String, 当读取发生错误时, err参数代表一个错误对象,
* ,data为undefined, 这也是Node.js的标准回调函数: 第一个参数代表错误信息, 第二个参数代表结果
* */
/* 由于err是否为 null 就是判断是否出错的标志, 因此通常的判断逻辑总是: */
/*if (err) {
  // 出错
} else {
  // 正常
}*/
/* 如果读取的是二进制文件, 如下 */
// 读取一个图片文件
fs.readFile('simple.png', function(err , data) {
  if (err) {
    console.log(err)
  } else {
    console.log(data)
    console.log(data.length + ' bytes')
  }
})
/* 当读取二进制文件且不传入文件编码时, 回调函数的data参数将返回一个Buffer对象, 在Node.js中, Buffer对象就是一个包含零个或任意个字节的数组 */
/* Buffer对象可以和String作转换, 例如把一个Buffer对象转换成String */
/*let text = data.toString('utf-8')
console.log(text)
// 或者把一个string转换成一个Buffer
let buf = Buffer.from(text, 'utf-8')
console.log(buf)*/


/* 同步读文件 */
/* 除了标准的异步读取模式外, fs也提供相应的同步读取函数, 同步读取的函数和一步函数相比多了一个Sync后缀, 并且不接受回调函数, 函数直接返回结果 */
// 用fs模块同步读取一个文本文件
data = fs.readFileSync('simple.txt', 'utf-8')
console.log(data)
/* 可见: 原异步调用的回调函数的data被函数直接返回, 函数名需要该外readFileSync, 其他参数不变 */
/* 如果同步读取文件发生错误, 需要使用try...catch来捕获该错误 */
try {
  data = fs.readFileSync('simple.txt', 'utf-8')
  console.log(data)
} catch (err) {
  // 出错了
  console.log(err)
}

/* 写文件 */
// 将数据写入文件时通过 fs.writeFile() 实现的
data = 'Hello, Node.js!'
fs.writeFile('outPut.txt', data, function (err) {
  if (err) {
    console.log(err)
  } else {
    console.log('OK')
  }
})
/*
*   writeFile() 的参数依次为文件名, 数据 和回调函数, 如果传入的数据是String, 默认按UTF-8编码写入文本文件, 如果传入的参数是Buffer则写入的是
* 二进制文件, 回调函数由于只关心成功与否, 因此只需要一个err参数
* */
/* 和readFile() 类似, writeFile() 也有一个同步方法, 叫writeFileSync() */
data = 'Hello, Node.js!'
fs.writeFileSync('output.txt', data)

/* stat */
/* 如果我们要获取文件大小, 创建时间等信息, 可以使用fs.stat(), 它返回一个Stat对象, 展示文件或目录的详细信息 */
fs.stat('sample.txt', function(err, stat) {
  if (err) {
    console.log(err)
  } else {
    // 是否是文件
    console.log('isFile' + stat.isFile())
    // 是否是目录
    console.log('isDirectory' + stat.isDirectory())
    if (stat.isFile()) {
      // 文件大小
      console.log('size', + stat.size)
      // 创建时间, Date对象
      console.log('birth time' + stat.birthtime)
      // 修改时间, Data对象
      console.log('modified time' + stat.mtime)
    }
  }
})
/* 同理, stat() 也有一个对应的Sync同步函数 */

/* 异步还是同步 */
/* fs模块中提供同步方法是为了方便使用
*   由于Node环境执行的JS代码是服务器端代码, 所以绝大部分需要在服务器运行期间反复执行业务逻辑代码, 因此必须使用异步代码, 否则同步代码在执行期间,
* 服务器将停止响应, 因为JS只有一个执行线程
*   服务器启动时如果需要读取配置文件, 或者结束时需要写入到状态文件时, 可以使用同步代码, 因为这些代码只在启动和结束时执行一次, 不影响服务器正常运行时的异步执行
*  */

/* 另外, fs模块的读写目录是当前工作区的相对路径, 同时执行异步操作文件的过程中, 也是谁先完成异步读取, 先执行谁的回调 */
