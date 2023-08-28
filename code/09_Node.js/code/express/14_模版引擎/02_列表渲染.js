const ejs = require('ejs')
const xiyou = ['唐僧','孙悟空','猪八戒','沙僧']

// 原生js
// let str = '<ul>'
// xiyou.forEach(item => {
//   str += '<li>${item}</li>'
// })
//
// 闭合ul
// str += '</ul>'
// console.log(str)

// EJS 实现
/** 需要注意的就是<% %>的标记, 在这个标记中可以写js语法, ejs会对包裹的内容进行解析, 并执行其中的js代码, 对所包裹的内容做了一个循环处理 */
const fs = require('fs')
let html = fs.readFileSync('./02_xiyou.html').toString()
let result = ejs.render(html, {xiyou: xiyou})

console.log(result)
