// promise.allSettled 接收一个 promise 的数组, 返回的结果永远为成功状态的 promise, 且成功的值是里面每一个 promise 的状态和结果
// 与 promise.all 不同的是, all中只要有一个promise失败就全失败, 且失败时直接停止 即 all 是阻塞的
const p1 = new Promise((res, rej) => {
  setTimeout(() => {
    res('商品数据 - 1')
  }, 1000)
})

const p2 = new Promise((res, rej) => {
  setTimeout(() => {
    // res('商品数据 - 2')
    rej('出错了')
  }, 1000)
})

// 调用 allSettled 方法
const result = Promise.allSettled([p1, p2])
console.log(result)

const result2 = Promise.all([p1, p2])
console.log(result2)