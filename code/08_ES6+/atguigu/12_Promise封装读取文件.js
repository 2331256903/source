const fs = require('fs')

/*fs.readFile('./为学.md', (err, data) => {
  if (err) {
    throw err
  }
  console.log(data.toString())
})*/

// 使用Promise封装
const P = new Promise(function (resolve, reject) {
  fs.readFile('./为学.md', (err, data) => {
    if (err) {
      reject(err)
    }
    resolve(data)
  })
})

p.then(function (value){
  console.log(value.toString())
}, function(reason){
  console.log('读取失败')
})