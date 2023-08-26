// 1. 导入uniq包
// 第一种写法, 会往上级文件夹自动寻找, 更加灵活
// const uniq = require('uniq')
// 找到文件夹导入, 同样的结果
// const uniq = require('../../../../../node_modules/uniq')
// 等同与导入文件夹下的js文件, 实际导入的是uniq.js暴露出的函数
const uniq = require('../../../../../node_modules/uniq/uniq.js')

// 2. 使用函数
let arr = [1, 2, 2, 3, 3, 3, 5, 5, 4, 4, 1, 2]
const result = uniq(arr)
console.log(result)
