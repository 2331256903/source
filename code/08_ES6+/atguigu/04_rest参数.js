 // ES6引入rest参数, 用于获取函数的实参, 用来代替arguments
 // ES5 arguments
 function data() {
   console.log(arguments)
 }
 data('1','12','3')
 
 // ES6 rest 参数
 function date(...args) {
   console.log(args)
 }
 /** rest参数必须要放到参数最后 */
 function fn(a, b, ...args) {
   console.log(a)
   console.log(b)
   console.log(args)
 }
 fn(1, 2, 3, 4, 5, 6)