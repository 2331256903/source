// ES6之前的模块化规范有 CommonJS => Node.js   Browserify     AMD => requireJS    CMD => seaJS
// 模块化规范用于 防止命名冲突, 实现代码复用和高维护性

// 分别暴露
export let school = '尚硅谷'
export function teach() {
  console.log("教导知识")
}