// 生成器函数是ES6提供的一种异步编程解决方案, 语法行为与传统函数完全不同
// 在此之前异步编程使用纯回调函数

// yield 类似函数代码的分隔符, 下面两个yield产生三块代码, 调用函数时每次调用next()就运行下一块代码
/*
* yield关键字用来暂停和恢复一个遍历器函数的运行
* 作用是命令, 类似return, 用来告知程序的某种状态, return告诉程序返回什么值, 也意味着结束, 而yield是告知程序当前的状态值, 而且运行到此处暂停
* 由于yield是命令型的关键字, 用法是 [rv] = yield [expression]
*   其中rv可选, yield后面的表达式也是可选的, yield的返回值是一个状态值
* 总结: yield只能在Generator函数内部使用
*      运行.next(), 遇到一个yield命令就暂停, 再次运行.next()就从之前遇到的yield表达式后继续恢复运行
*      .next() 的返回值表示一个状态{value, done}
*      当.next()传参的时候, yield[表达式]被整个替换为传入的参数
* */

// function *  生成器函数, 用于起到延时加载任务的作用, 处理异步任务
// 在执行时能中途退出, 后续重新调用时又能重新进入并继续执行的函数, 且函数中定义的变量的所有状态不受中途退出影响
function * gen(){
  console.log(111)
  yield '123'
  console.log(222)
  yield '456'
  console.log("hello generator")
}

// 得到函数的迭代器
let iterator = gen()

// 得到迭代器后通过 next 执行
iterator.next()
iterator.next()
iterator.next()

// for...of遍历  每次v返回的结果是yield后的字面量
for(let v of gen()) {
  console.log (v)
}

// 生成器函数参数
function * gen2(arg){
  console.log(arg)
  let one = yield '111'
  console.log(one) // 这里的one对应拿到后面第二次调用时传入的实参 'BBB'
  yield '222'
  yield '333'
}
let iterator2 = gen2('AAA')
console.log(iterator2.next()) // AAA
// next() 方法可以传入实参, 每次调用next方法时传入的实参将作为上一个yield语句的返回结果
console.log(iterator2.next('BBB'))

// 如果在一个生成器函数中调用另一个生成器函数, 必须加*
function* text1() {
  yield * text()
}