/**
 * ES6 允许在大括号里面直接写入变量和函数, 作为对象的属性和方法, 这样书写更加简洁
 * */
let name = '123'
let change = function () {
  console.log('hehe')
}

const school = {
  name,
  change,
  // 方法声明的简化 原本需要 improve: function() {}
  improve() {
    console.log("好好好")
  }
}
