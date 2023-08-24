/* Node中不可以使用BOM和DOM的API 除了console和定时器 */
// BOM
console.log(window)
console.log(history)
console.log(navigator)
console.log(location)
// DOM
console.log(document)
// AJAX
let xhr = new XMLHttpRequest()

/* log 和 定时器 */
console.log('i love you')
setTimeout(() => {
  console.log('love too')
}, 1000)

/* Node中顶级对象叫 global */
console.log(global)
console.log(globalThis === global) // ES2020中引入的新的特性, 用于指向顶级对象
