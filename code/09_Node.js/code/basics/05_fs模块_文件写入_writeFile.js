/* Node.js的fs模块, 可以实现与硬盘的交互, 例如文件的创建,删除,重命名,移动, 还有文件的写入和读取, 以及文件夹的相关操作 */
// 新建一个文件, 座右铭.txt, 写入内容, 三人行, 则必有我师焉
// 1. 导入fs模块
const fs = require('fs') // require为全局函数,参数为模块名称, 用于导入模块

// 2. 写入文件
/* fs.writeFile(file, data[,options], callback)
*   1. file: 文件名
*   2. data: 待写入数据
*   3. options: 选项设置
*   4. callback: 写入回调函数, 当写入完成后自动调用, 并将错误传递给函数(或err)
*   返回值" undefined
*  */
fs.writeFile('./座右铭.txt', '三人行, 则必有我师焉', err => {
  // 如果写入失败, err的值就是一个错误对象; 写入成功则err的值为null
  if (err) {
    console.log('写入失败')
    return
  }
  console.log('写入成功')
}) // 此处文件如果不存在, 会自动创建同名文件并写入

/* 使用脚本写入文件的意义在于自动化记录数据, 包括日志等, 使用VsCode写程序, 实际上也是使用fs模块进行写入 */
