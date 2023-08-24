// 1. 引入fs模块
const fs = require('fs')

// 2. 异步读取 fs.readFile(path[, options], callback) 三个参数: 文件路径, 配置对象, 回调函数
fs.readFile('./观书有感.txt', (err, data) => { // err用来接收错误信息, data用来读取文件内容
  if (err) {
    console.log('读取失败')
    return
  }
  console.log(data.toString()) // 按照编码进行一个字符串转化就可以读取到文字了
})

// 3. 同步读取
let data = fs.readFileSync('./观书有感.txt')
console.log(data.toString())

/* 收到用户请求后, 通过用户脚本读取内容, 再通过网络返回给浏览器(用户)来实现自动化 */

/* 读取文件应用场景
*   1. 电脑开机
*   2. 程序运行
*   3. 编辑器打开文件
*   4. 查看图片
*   5. 播放视频
*   6. 播放音乐
*   7. Git查看日志
*   8. 上传文件
*   9. 查看聊天记录
* */
