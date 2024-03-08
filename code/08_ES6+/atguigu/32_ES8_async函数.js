// async 和 await 两种语法结合可以让异步代码像同步代码一样
// async函数的返回值为promise对象, promise对象的结果又async函数执行的返回值决定
async function fn() {
  // 返回一个字符串  返回的不是一个promise类型对象, 则函数的返回结果就是一个成功的promise对象
  // return undefined
  
  // 抛出错误  返回的是一个失败的promise, value是失败的对象
  // throw new Error('出错了')
  
  // 返回的结果是一个promise对象(常见)
  return new Promise((res, rej) => {
    rej('失败的数据')
  })
}
const result = fn()
console.log(result)

// 调用then方法
result.then(val => {
  console.log(val)
}, reason => {
  console.warn(reason)
})

// await表达式
// 1. await必须写在async函数中
// 2. await右侧的表达式一般为promise对象
// 3. await返回的是promise成功的值
// 4. await的promise失败了就会抛出异常, 需要用try...catch捕获处理

const p = new Promise((res, rej) => {
  // res('成功的值')
  rej("失败了")
}) // promise有两个属性, 一个表示状态, 一个表示状态对应的值
async function main() {
  try {
    let result = await p // await返回的结果是promise对象成功的值
    console.log(result)
  } catch (e) { // 如果await的promise对象失败了, 需要使用 try catch 进行捕获
    console.log(e)
  }
}