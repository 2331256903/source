const fs = require("fs")
function readWeiXue() {
  return new Promise((res, rej) => {
    fs.readFile("./为学.md", (err, data) => {
      if(err) {
        rej(err)
      }
      res(data)
    })
  })
}

function readChaYangShi() {
  return new Promise((res, rej) => {
    fs.readFile("./插秧诗.md", (err, data) => {
      if(err) {
        rej(err)
      }
      res(data)
    })
  })
}

function readGuanShu() {
  return new Promise((res, rej) => {
    fs.readFile("./观书有感.md", (err, data) => {
      if(err) {
        rej(err)
      }
      res(data)
    })
  })
}

// 声明async函数
async function main() {
  let weixue = await readWeiXue()
  let chayang = await readChaYangShi()
  let guanshu = await readGuanShu()
  console.log(weixue.toString())
  console.log(chayang.toString())
  console.log(guanshu.toString())
}

main()