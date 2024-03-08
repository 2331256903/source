/**
 * 1. 箭头函数的this值是静态的, this始终只想函数声明时所在作用域下this的值
 * 原先想在回调函数中使用this, 要在在外层定义一个that接收this再传参, 现在只需要使用箭头函数即可
 * */
window.name = 'shangguigu'
const school = {
  name: '好'
}

function getName() {
  console.log(this.name)
}
let getName2 = () => {
  console.log(this.name)
}

/** 即使使用call方法也不能修改箭头函数中this的指向 */
getName.call(school)
getName2.call(school)

/**
 * 2. 不能作为构造函数的实例化对象
 * */
let Person = (name, age) => {
  this.age = age
  this.name = name
}

let me = new Person('xiao', 19)
console.log(me)  // 报错


/**
 * 3. 不能使用arguments变量
 * */
let fn = () => {
  console.log(arguments)
}
fn(1, 2, 3) // 报错


/**
 * 4. 箭头函数的简写
 *   当参数只有一个时, 小括号可省略
 *   代码体只有一条时, 花括号可以省略, 此时return必须省略, 且语句执行结果就是返回值
 * */


/**
 * 箭头函数适合与this无关的回调, 定时器, 数组的方法回调
 * 不适合与this有关的回调: 事件回调, 对象的方法
 * */