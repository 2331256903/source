// 将 座右铭.txt 更名为 论语.txt
const fs = require('fs')

// 调用rename方法 重命名
/*fs.rename('./座右铭.txt', './论语.txt', err => {
  if (err) {
    console.log('操作失败')
    return
  }
  console.log('操作成功')
})*/

// 文件移动
/* 本质和rename方法一样, 第二个参数改成想要的路径位置 */

/* 和前面的一样, rename也有一个同步的 Sync操作, 去掉了回调函数 */
