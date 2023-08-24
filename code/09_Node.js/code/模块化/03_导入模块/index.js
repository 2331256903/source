/**
 * 导入/引入模块
 * const test = require('./me.js')
 * require的一些注意事项:
 *   1. 自己创建的模块, 导入时路径写相对路径, 且不要省略./ 和../
 *   2. js和json文件导入时可以不写后缀(.js), c/c++编写的node扩展文件也可以不写后缀, 但是一般用不到
 *   3. 如果导入其他类型的文件, 会按照js文件进行处理  一般用不到
 *   4. 如果导入的路径是个文件夹, 则会首先检测该文件夹下package.json文件中的main属性对应的文件, 如果存在则导入, 如果不存在会报错
 *      如果main属性不存在, 或者package.json不存在, 则会尝试导入文件夹下的index.js和index.json, 如果还是没找到就会报错
 *   5. 导入node.js内置模块时, 直接require模块的名字即可, 无需加./ 和../
 * */
// 导入模块
/* require返回的值是目标模块的module.exports的值 */
const me = require('./me.js')

// 省略后缀 JS
const tiemo = require('./me')

// 导入JSON文件
/* 注意: 省略后缀的时候, 会优先导入js文件, 如果找不到js文件后再找同名json文件 */
const duanzi = require('./duanzi')
console.log(duanzi)

// 导入其他类型的文件 默认按照js文件导入
const test = require('./test.abc')

// 调用函数
tiemo()
