// promise 读取多个文件
const fs = require('fs')
/*fs.readFile('./为学.md', (err, data1) => {
  fs.readFile('./插秧诗.md', (err, data2) => {
    fs.readFile('./观书有感.md', (err, data3) => {
      let result = data1 + '\r\n' + data2 + '\r\n' + data3
      console.log(result)
    })
  })
})*/

// 使用promise实现
const p = new Promise((res, rej) => {
  fs.readFile('./为学.md', (err, data) => {
    if(err) rej(err)
    res(data)
  })
})
p.then(value => {
  return new Promise((res, rej) => {
    fs.readFile('./插秧诗.md', (err, data) => {
      if(err) rej(err)
      res([value, data])
    })
  })
}).then(value => {
  return new Promise((res, rej) => {
    fs.readFile('./观书有感.md', (err, data) => {
      if(err) rej(err)
      // 压入
      value.push(data)
      res(value)
    })
  })
}).then(value => {
  console.log(value.join('\r\n'))
})