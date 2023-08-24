const fs = require('fs')

// 读取 code 文件夹
const files = fs.readdirSync('../code')

// 遍历数组
files.forEach(item => {
  // 拆分文件名
  if (item.endsWith('js')) {
    let data = item.split('_')
    let [num, ...name] = data
    if (Number(num) < 10 && !num.startsWith('0')) {
      num = '0' + num
    }
    let newName = num + '_' + name.join('_')
    fs.renameSync(`../code/${item}`, `../code/${newName}`)
  }
})

