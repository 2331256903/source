/* 实际开发过程中, 随着程序代码越写越多, 在一个文件里代码就会越来越长, 越来越不易维护
*  为了编写可维护的代码, 我们可以把很多函数分组, 分别放到不同的文件里, 这样每个文件包含的代码就会相对较少, 很多编程语言都采用这种组织代码的方式
* 在Node环境中, 一个.js文件就称之为一个模块
*  使用模块的最大好处就是大大提高了代码的可维护性, 其次编写代码无需从零开始, 当一个模块编写完之后就可以被很多其他的地方引用, 我们在编写程序的时候经常需要引用其他的模块
* ,包括Node内置的模块和来自第三方的模块
*  使用模块还可以避免函数名和变量名冲突, 相同名字的变量完全可以分别存在不同的模块中, 因此自己在编写模块时不必考虑名字会和其他模块冲突
*  */
// 例如上一节所写的hello.j文件就是名为hello的模块, 把hello改造一下,创建一个函数,这样就可以在其他地方调用这个函数
/*'use struct'
let s = 'Hello'
function greet(name) {
  console.log(s + ',' + name + '!')
}
module.exports = greet*/
/* 函数greet()是我们在hello模块汇中定义的, 最后一行的意思是把函数作为greet作为模块的输出暴露出去, 这样其他模块就可以使用greet函数了 */

// 其他模块怎么使用hello模块的greet函数: 在编写一个main.js文件, 调用hello模块的greet函数
/*'use struct
* // 引入hello模块
* let greet = require('./hello')
* let s = 'Michael'
* greet(s) // Hello, Michael
* */
/* 注意到引入hello模块用Node提供的require函数 */
/* 引入的模块作为变量保存在greet变量中, 而greet变量其实就是在hello.js中用module.export = greet输出的greet函数
, 所以main.js就成功地引用了hello.js模块中定义的greet()函数, 接下来就可以直接使用它了 */
/* 在使用require()引入模块的时候需要注意模块的相对路径
*   如果引入时只写模块名, 则Node会依次在内置模块, 全局模块和当前模块下查找hello.js
*  */

/* CommonJS规范
*   这种模块加载机制被称为CommonJS规范, 在这个规范下, 每个.js文件都是一个模块, 它们内部各自使用的变量名和函数名都不冲突, 都声明了全局变量也互不冲突
*   一个模块想要对外暴露变量(函数也是变量), 可以用module.export = letiable, 一个模块要引用其他模块暴露的变量, 用let ref = require('module_name')
* 就能拿到引用模块的变量
* */

/*
* CommonJS模块的实现原理
*   编写JS时可以声明全局变量
*   在浏览器中,大量使用全局变量不好, JS本身并没有一种模块机制保证不同模块可以使用相同的变量名
*   而在Node.js中如何实现的? :
*     实现模块功能其实本身并不需要语法层面的支持, 奥妙在于JS是一种函数式编程语言, 支持闭包, 把一段JS代码用一个函数包装起来, 这段代码的全局变量就变成了函数内部的局部变量,
* 因此Node.js利用JS的函数式编程特性, 实现了模块的隔离
*   但同时module.exports怎么实现? :
*     Node先准备一个对象module
* */
let module = {
  id: 'hello',
  exports: {}
}
let load = function (module) {
  // 读取hello.js的代码
  function greet(name) {
    console.log('Hello' + name + '!')
  }
  module.exports = greet
  // hello.js代码结束
  return module.exports
}
let exported = load(module)
// 保存module
save (module, exported)
/*
*     可见变量module是Node在加载js文件之前准备的一个变量, 并将其传入加载函数, 我们在hello.js中可以直接使用变量module的原因就在于它实际上是函数的一个参数
*     通过把参数传递给load()函数, hello.js就顺利地把一个变量传递给了Node执行环境, Node会把module变量保存到某个地方
*   由于Node保存了所有导入的module, 当我们用require()获取modules时, Node找到对象的module, 把这个module的exports变量返回, 这样另一个模块就顺利拿到了模块的输出
*   以上就是Node实现JS模块的一个简单原理的介绍
* */

/* module.export 和 export
*   很多时候,在Node环境中有两种方法可以在一个模块中输变量:
*  */
// 方法1: 对module.export赋值
function hello () {
  console.log('Hello World')
}
function greet(name) {
  console.log('Hello, ' + name + '!')
}
module.exports = {
  hello: hello,
  greet: greet
}
// 方法2: 直接使用exports
exports.hello = hello
exports.greet = greet
/* 但不能直接对exports赋值
*   exports = {
*     hello: hello
*     greet: greet
*   }
* 代码可以执行,但模块并没有输出任何变量
*  */

/* 如果对上述写法感到困惑, 下面分析下Node的加载机制 */
/* Node的加载机制: 首先Node会把整个待加载的hello.js文件放入一个包装函数load中执行,在执行这个load函数前Node准备好了Module变量 */
/*let module = {
  id: 'Hello',
  exports: {}
}*/

/* load函数最终返回module.exports */
/*let load = function (exports, module) {
  // hello.js的文件内容
  // ...
  // load函数返回
  return module.exports
}
let exports = load(module.exports, module)*/

/* 也就是说, 默认情况下, Node准备的exports变量和module.exports变量实际上是同一个变量, 并且初始化为空对象{}, 并且我们可以写 */
exports.foo = function() { return 'foo'}
exports.bar = function() { return 'bar'}
// 也可以写
module.exports.foo = function() { return 'foo'}
module.exports.bar = function() { return 'bar'}

/* 换句话说, Node默认为我们准备了一个空对象, 这样可以直接往里面加东西 */
/* 但是如果要输出的是一个函数或者数组, 那么只能给module.exports赋值 */
module.exports = function () { return 'foo' }
/* 综上, 给exports赋值是无效的, 因为赋值后, module.exports仍然是空对象{} */

/* 结论:
*   如果要输出一个键值对象{}, 可以利用exports这个已经存在的空对象{}, 并继续在上面添加新的键值
*   如果要输出一个函数或者数组, 必须直接对module.exports赋值
*  因此, 建议任何场合都直接使用 module.exports = xxx 的方式来输出模块变量
*  */

