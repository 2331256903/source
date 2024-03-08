// ... 扩展运算符能将数组转换为逗号分隔的参数序列
const str = ['a', 'b', 'c']
console.log(...str)

/*
 * 用途:
 *   1. 数组的合并
 * */
const str1 = [a, b, c]
const str2 = [d, e, f]
const merge = str1.concat(str2) // ES5
const merge2 = [...str1, ...str2] // ES6

/* 2. 数组的克隆 */
const str3 = [...str1]

/* 3. 伪数组转换成真正的数组 */
const divs = document.querySelectorAll('div')
const divArr = [...divs]
console.log(divArr)