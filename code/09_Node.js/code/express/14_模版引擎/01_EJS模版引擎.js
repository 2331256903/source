/**
 * 模版引擎是分离用户界面和业务数据的一种技术 即分离HTML和服务端JS
 * EJS: 一个高效的JS模板引擎
 * */
const ejs = require('ejs')
const fs = require('fs')

// 字符串
let china = '中国'
// let str = `我爱你 ${china}`
let weather = '今天天气不错'

// 声明变量 模板和变量分离
// let str = '我爱你 <%= china %>'
let str = fs.readFileSync('./01_html.html').toString()

// 使用ejs渲染  render渲染函数, 对模板进行解析, 找到<%= %>中的内容并将内容替换成后面对象中的数据
let result = ejs.render(str, {china: china, weather})

console.log(result)
