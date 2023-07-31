/* 流式读取, 一块一块读取文件内容 */
// 1. 引入 fs 模块
const fs = require('fs')

// 2. 创建读取流对象
const rs = fs.createReadStream('../01_HTML/atguigu/source/不熄的光(《火影忍者》手游重燃主题曲).mp3')

// 3. 为读取流对象绑定 data 事件  chunk(大块) 每当从文件中读取一块数据时就会执行一次回调, 并将内容传递给形参chunk等待处理
rs.on('data', chunk => {
  console.log(chunk.length)  // 通过 length 属性可以获得每次读取的块的长度  65536  默认每次块为64kb
})

// 4. end 可选事件
rs.on('end', () => {
  console.log('读取完成')
})

/* 流式读取大文件时会提高效率 */
