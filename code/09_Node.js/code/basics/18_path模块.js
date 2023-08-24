const fs = require('fs')
const path = require('path')
const {parse} = require("request/lib/cookies");

console.log(__dirname + '/index.http')
// C:\Users\Administrator\Desktop\source\code\09_Node.js\code/index.http
// 此路径前后分割符不统一, 不规范

// 1. path.resolve(绝对路径, 相对路径1, 相对路径2....) 用于拼接规范的绝对路径  通常只有第一个参数使用绝对路径, 后续参数为相对路径
console.log(path.resolve(__dirname, './index.http'))  // 此处index前不写./也行

// 其他path的API用的比较少
// 2. sep 保存当前操作系统的路径分割符
console.log(path.sep) // Windows \  Linux /

// 3. parse 方法  解析路径并返回对象
// __filename 保存的是文件的绝对路径 __dirname是文件夹的绝对路径
let str = 'C:\\Users\\Administrator\\Desktop\\source\\code\\09_Node.js\\code\\18_path模块.js'
console.log(path.parse(str))

// 4. basename 获取路径的基础名称
// 5. dirname 获取路径的目录名
// 6. extname 获得路径的扩展名  .js
