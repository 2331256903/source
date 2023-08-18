/* JS是一门单线程语言, 所以按照语句的出现顺序执行 */
/* JS是单线程语言, H5中提出了Web Workers API, 但JS是单线程这一核心仍未改变, 一切JS版的多线程都是用单线程模拟出来的 */
/*
* JS事件循环
*   任务分为同步任务和异步任务
*   同步任务进入主线程执行, 异步任务进入Event Table并注册函数
*   当指定的事情完成时, Event Table会将这个函数移入Event Queue
*   主线程内的任务执行完毕为空, 会去Event Queue读取对应的函数, 进入主线程执行
*   上述过程会不断重复, 也就是常说的Event Loop事件循环
* js引擎存在monitoring process进程, 会持续不断地检查主线程执行栈是否为空, 一旦为空, 就会去Event Queue那里检查是否有等待被调用的函数
* */
/*
* setTimeout
*   setTimeout是指经过指定时间后, 把要执行的任务加入到Event Queue中, 又因为是单线程要一个一个执行, 如果前面的任务需要的时间太久就只能等着,
* 导致真正的时间长于设定时间
*   setTimeout(fn, 0)的含义: 指定某个任务在主线程最早可得的空闲时间执行, 只要主线程执行栈内的同步任务全部完成, 栈为空就马上执行
* */
/*
* setInterval
*   同理, 也是每隔设定时间后fn进入Event Queue, 另外, 一旦setInterval的回调函数fn的执行时间超过了延迟时间, 那么就完全看不出来有时间间隔了
* */
/*
* Promise与process.nextTick(callback)
*     process.nextTick(callback)类似node.js版的setTimeout, 在事件循环的下一次循环中调用callback函数
*     除了广义的同步任务和异步任务, 对任务还有````更精细的定义:
*       macro-task宏任务: 包括整体代码script, setTimeout, setInterval
*       micro-task微任务: Promise process.nextTick
*     不同类型的任务会进入对应的Event Queue, 比如setTimeout和setInterval会进入相同的Event Queue
*     时间循环的顺序, 决定js代码的执行顺序, 进入整体代码(宏任务)后. 开始第一次循环, 接着执行所有的微任务, 然后再次从宏任务开始, 找到其中一个任务队列
*   执行完毕, 再执行所有的微任务, 每次只执行一个宏任务, 但是微任务全部执行, 例子:
* */
setTimeout(function() {
  console.log('setTimeout')
})
new Promise(function() {
  console.log('promise')
}).then(function(){
  console.log('then')
})
console.log('console')
/*
*   这段代码作为宏任务, 进入主线程, 先遇到setTimeout, 那么将其回调函数注册后分发到宏任务Event Queue, 接下来遇到Promise, new Promise立即执行
* 并将then函数分发到微任务Event Queue, 遇到console.log, 立即执行
*   至此整体代码script作为第一个宏任务执行结束, 发现then 在微任务Event Queue中, 执行
*   至此第一轮事件循环结束, 开始第二轮事件循环, 从宏任务Event Queue开始, 宏任务Event Queue中的setTimeout对应的回调函数, 立即执行
* */

/*
* 最后:
*   1. JS是一门单线程语言, 无论是什么新框架新语法糖实现的所谓异步本质都是用同步的方法模拟出的异步, 把握单线程这点十分重要
*   2. 事件循环是js实现异步的一种方法, 也是js的执行机制
*   3. JS的执行和运行, 有很大区别, js在不同的环境下, 比如node, 浏览器, Ringo等, 执行方式是不同的, 而运行大多指JS解析引擎, 是统一的
*   4. 宏任务和微任务还有很多种类, 比如 setImmediate 等, 执行都是有共同点的
* */
