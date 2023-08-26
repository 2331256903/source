/**
 * require导入自定义模块的基本流程
 * 1. 将相对路径转化为绝对路径, 定位目标文件
 * 2. 缓存检测
 * 3. 读取目标文件代码
 * 4. 包裹为一个自执行函数并执行, 通过argument.callee.toString() 查看自执行函数
 * 5. 缓存模块的值
 * 6. 返回module.exports的值
 * */

/**
 * 以下为伪代码
 * */
function require(file) {
  // 1. 将相对路径转为绝对路径, 定位目标文件
  let absolutePath = path.resolve(__dirname, file)
  // 2. 缓存检测, 检测之前有没有加载过这个文件, 如果加载过了直接从缓存拿
  if (cache[absolutePath]) {
    return cache[absolutePath]
  }
  // 3. 读取文件代码
  let code = fs.readFileSync(absolutePath).toString()
  // 4. 包裹为一个函数并执行
  let module = {}
  let exports = module.exports = {}
  (function (exports, require, module, __filename, __dirname) {
    const test = {
      name: 'shangguigu'
    }
    module.exports =
      test
    console.log(arguments.callee.toString())
  })()
  // 5. 缓存结果
  cache[absolutePath] = module.exports // 实际上缓存的是一个模块对象, 方便理解写成module.exports
  // 6. 返回module.exports的值
  return module.exports
}
const m = require('./me.js')
