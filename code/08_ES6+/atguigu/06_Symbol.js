/* ES6引入了新的原始数据类型Symbol, 用来表示独一无二的值, 是一种类似字符串的数据类型 */
/*
* 1. Symbol的值是唯一的, 用来解决命名冲突的问题
* 2. Symbol的值不能与其他数据进行运算
* 3. Symbol定义的对象属性不能使用for...in来循环遍历, 但是可以使用Reflect.ownKeys来获取对象所有键名
* 4. Symbol
* */

// 创建Symbol
let s = Symbol()
console.log(s, typeof s)

// 描述字符串, 用于区分Symbol
let s2 = Symbol('尚硅谷')
let s3 = Symbol('尚硅谷')
console.log(s2 === s3) // false

// Symbol.for创建   Symbol.for(key) 根据给定的键key从未运行时的Symbol注册表中找到对应的symbol, 找到则返回它, 否则新建一个与该键关联的symbol并放入全局symbol注册表中
let s4 = Symbol.for('尚硅谷')
let s5 = Symbol.for('尚硅谷')
console.log(s4, typeof s4)
console.log(s4 === s5) // true

// symbol类型数组不能与其他数据进行运算
// let result = s + 100
// let result2 = s + '100'

// js数据类型 USONB
/**
 * U undefined
 * S string symbol
 * O object
 * N null number
 * B boolean
 * */

/* Symbol的使用
* 用于给对象添加属性和方法  up  down
* */
let methods = {
  up: Symbol(),
  down: Symbol()
}
let game = {
  methods
}
game[methods.up] = function() {
  console.log("我可以改变形状")
}
game[methods.down] = function() {
  console.log("我可以快速下降!")
}

console.log(game)

// Symbol 作属性名的时候不可以使用 . 运算符, 且Symbol必须放在 [] 中
let youxi = {
  name: "狼人杀",
  [Symbol('say')]: function() {
    console.log("发言")
  },
  [Symbol('zibao')]: function() {
    console.log("自爆")
  }
}

/* Symbol 内置值
* 除了定义自己使用的Symbol值之外, ES6还提供了11个内置的Symbol值, 指向语言内部使用的方法
* */
// 1. Symbol.hasInstance  当其他对象使用instanceof运算符, 判断是否为该对象的实例时会调用这个方法;  因此可以用它自定义instanceof操作符在某个类上的行为
// 主要用于 在使用instanceof时控制结果
class Person{
  // 声明静态方法, 该方法在判断目标对象是否为 Person 对象的实例(调用instanceof)时自动调用
  static [Symbol.hasInstance](param) {
    console.log(param)
    console.log("我被用来检测类型了")
    return true
  }
}

let o = {}
console.log(o instanceof Person)

// 2. Symbol.isConcatSpreadable  对象的Symbol.isConcatSpreadable属性等于一个布尔值, 表示该对象用于Array.prototype.concat()时是否可以展开
const arr = [1, 2, 3]
const arr2 = [4, 5, 6]
arr2[Symbol.isConcatSpreadable] = false
console.log(arr.concat(arr2))