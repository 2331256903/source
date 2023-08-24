const test = {
  name: 'shangguigu'
}

module.exports = test

/* me.js文件的代码, 在内部执行的时候是包裹在一个函数里面执行的 */
// 输出该函数
console.log(arguments.callee.toString())
console.log(test)
