// 需求: 写诗:观书有感
// 1. 导入fs模块
const fs = require('fs')

// 2. 创建一个写入流对象
const ws = fs.createWriteStream('./观书有感.txt') // 相当于与该文件创建了一个通道, 想写的时候传值即可

// 3. write
ws.write('半亩方塘一鉴开\r\n')
ws.write('天光云影共徘徊\r\n')
ws.write('问渠那得清如许\r\n')
ws.write('为有源头活水来\r\n')

// 4.关闭通道
ws.close() // 此处可以不写, 对于这个js脚本来说, 在脚本执行完的时候资源会自动被回收, 写入流会自动断开

/* 流式写入更适合写入频次较高的场景以及大文件的写入, writeFile更适合写入频次相对较少的场景 */
