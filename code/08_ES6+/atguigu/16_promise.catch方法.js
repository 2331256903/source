const p = new Promise((res, rej) => {
  setTimeout(() => {
    // 修改p的状态为失败, 并设置失败的值
    rej("出错")
  }, 1000)
})

p.then(value => {

}, reason => {
  console.error(reason)
})

// catch方法, 只执行错误回调, 类似语法糖, 与then方法第一个参数为不执行回调的效果相同
p.catch(function (reason) {
  console.warn(reason)
})