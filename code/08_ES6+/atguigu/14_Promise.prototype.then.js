// 创建Promise对象
const p = new Promise((res, rej) => {
  setTimeout(() => {
    res('用户数据')
  }, 1000)
})

// 调用then 方法
const result = p.then(value => {
  console.log(value)
  // 1. 返回非promise类型的属性
  // return undefined
  // 2. 返回promise对象
  // return new Promise((res,rej) => {
  //   res('ok')
  // })
  // 3. 抛出错误
  throw new Error('出错啦!')
}, reason => {
  console.warn(reason)
})

// then方法的返回结果也是一个Promise对象, 对象状态由回调函数的执行结果决定
// 1. 如果回调函数中返回的结果是非Promise类型的属性, 状态为成功, 且返回值为对象的成功值
// 2. 如果返回结果是Promise对象, 则返回的该promise对象状态决定了then方法返回的promise状态, 且返回的该promise的值就是then方法返回的promise的值
// 3. 抛出错误  状态为reject, 且返回值为抛出的错误值
console.log(result)

// 由于then方法返回的结果也是promise, 因此可以链式调用下去, 继续嵌套异步任务, 因此解决回调地狱问题
p.then(value => {

}, reason => {

}).then(value => {

}, reason => {

})