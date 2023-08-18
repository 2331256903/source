/*
*   由于Node.js是运行在服务器端的JS环境, 服务器程序和浏览器程序相比, 最大的特点是没有浏览器的安全限制, 而且服务器必须能做到: 接收网络请求, 读写文件,
* 处理二进制内容, 所以Node.js内置的常用模块就是为了实现基本的服务器功能, 这些模块在浏览器环境中无法被执行, 因为他们的底层代码是用C/C++在Node.js的
* 运行环境中实现的
* */

/* global */
/*
*   JS仅有一个全局对象, 在浏览器中叫window对象, 而在Node.js环境中, 唯一全局对象叫做global, 这个对象的属性和方法也和浏览器环境的window不同, 进入Node.js
* 交互环境, 可以直接输入: global.console 进行查看
* */

/* process */
/*
*  process也是Node.js提供的一个对象, 它代表当前Node.js的进程, 通过该对象可以拿到很多有用的信息
*   process === global.process // true
*   process.version // 'v5.2.0'
*   process.platform // 'darwin'
*   process.arch // 'x64'
*   process.cwd() // 返回当前工作目录
*   process.chdir('/private/tmp') // 切换当前目录
*
*  JS程序是又事件驱动执行的单线程模型, Node.js同样, Node.js不断执行相应事件的JS函数, 知道没有任何响应事件的函数可以执行时Node.js退出
*   如果想在下一次事件响应中执行代码, 可以调用: process.nextTick()
* */
process.nextTick(function() {
  console.log('nextTick callback!')
})
console.log('nextTick was set!')
/* 上述代码会先打印set那句, 由此说明传入process.nextTick()函数不是立即执行, 而是要等到下一次事件循环 */

/* Node.js进程本身的时间就由process对象来处理, 如果我们响应exit事件, 就可以在程序即将退出时执行某个回调函数*/
process.on('exit', function (code) {
  console.log('about to exit with code: ' + code)
})

/* 判断JS执行环境 */
/* 有许多JS代码既能在浏览器中执行, 也能在Node环境执行, 但是有些时候程序需要自己判断是在什么环境下执行的, 常用的方式就是根据浏览器或者Node环境提供的全局变量名来判断 */
if (typeof (window) === 'undefined') {
  console.log('node.js')
} else {
  console.log('browser')
}
