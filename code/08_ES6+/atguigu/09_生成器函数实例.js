// 1s后控制台输出111, 2s后输出222, 3s后输出333
// 异步编程 文件操作, 网络操作(ajax, request), 数据库操作

// 回调地狱
/*
setTimeout(()=> {
  console.log(111)
  setTimeout(()=> {
    console.log(222)
    setTimeout(()=> {
      console.log(333)
    },3000)
  },2000)
},1000)*/

function one() {
  setTimeout(()=>{
    console.log(111)
    iterator.next()
  },1000)
}

function two() {
  setTimeout(()=>{
    console.log(222)
    iterator.next()
  },2000)
}

function three() {
  setTimeout(()=>{
    console.log(333)
    iterator.next()
  },3000)
}

function * gen() {
  yield one()
  yield two()
  yield three()
}

// 调用生成器函数
let iterator = gen()
iterator.next()