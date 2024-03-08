// Promise是es6引入的异步编程的新解决方案, 语法上Promise是一个构造函数, 用来封装异步操作并可以获取其成功或失败的结果
// 1. Promise构造函数: Promise (executor) {}
// 2. Promise.prototype.then方法
// 3. Promise.prototype.catch方法

// 实例化Promise对象
const p = new Promise(function (resolve, reject){
  setTimeout(function(){
    let data = '数据库中的用户数据'
    // resolve
    // resolve(data)
    let err = '数据读取失败'
    reject(err)
  })
})

// 调用promise对象的then方法
p.then(function(value){
  console.log(value)
}, function(reason){
  console.log(reason)
})