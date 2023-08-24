// 导入
const m = require('./module')
/* 导入文件夹时会首先找文件夹的package.json中的main属性对应的文件是否存在, 存在则导入, 不存在则报错 */
console.log(m)
/* 如果main属性不存在, 或者package.json不存在, 则尝试导入文件夹下的index.js和index.json, 再找不到就报错 */

