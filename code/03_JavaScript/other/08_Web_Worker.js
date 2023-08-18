/* 注:
*   (1). Web Workers 使得一个Web应用程序可以在与主线程分离的后台线程中运行一个脚本操作; 作用是给JS创造多线程环境, 允许主线程创建worker线程,
*      分配任务给后者, 这样做的好处是主线程可以把计算密集型或高延迟的任务交给worker线程执行, 这样主线程就会轻松而不被阻塞或拖慢, 但是这并不意味着JS
*      语言本身支持了多线程的能力, 而是浏览器作为宿主环境提供了JS一个多线程的运行环境
*        work线程一旦新建就会一直运行, 不会被主线程的活动打断, 这样有利于随时响应主线程的通性, 但是也会造成资源的浪费, 所以用完应该注意关闭
*        注意点:
*          1. 同源限制: worker线程执行的脚本文件必须和主线程的脚本文件同源
*          2. 文件限制: worker线程无法读取本地文件, 它所加载的脚本必须来自网络, 且要与主线程的脚本同源
*          3. Dom操作限制: worker线程在与主线程的window不同的另一个全局上下文中运行, 其中无法读取主线程所在网页的DOM对象, 也不能获取document
*             window等对象, 但是可以获取navigator, location(只读), XMLHTTPRequest, setTimeout等浏览器API
*          4. 通信限制: worker线程与主线程不在同一个上下文, 不能直接通信, 需要通过postMessage方法通信
*          5. 脚本限制: worker线程不能执行alert, confirm, 但可以使用XMLHttpRequest对象发出AJAX请求
*  */
// 在主线程中生成worker线程
// var myWorker = new Worker(jsUrl, options)
/*  Worker构造函数, 第一个参数是脚本的网址(必须遵守同源策略)(必填且只能加载JS脚本), 第二个参数是配置对象(可选, 作用之一是指定worker的名称,
* 用来区分多个Work线程)
*/
// 主线程
var myWorker = new Worker('worker.js', { name: 'myWorker' })
// Worker线程
// self.name // myWorker

/* api例子 */
// worker线程的js文件 workerThread1.js
let i = 1
function simpleCount() {
  i++
  self.postMessage(i)
  setTimeout(simpleCount, 1000)
}
simpleCount()
self.onmessage = ev => {
  postMessage(ev.data + '哈哈')
}

// HTML文件的body中, 主线程
if (typeof(Worker) === 'undefined') { // 检查浏览器兼容性
  document.writeln(' Sorry! No Web Worker support.. ')
} else {
  window.w = new Worker('workerThread1.js')
  window.w.onmessage = ev => {
    document.getElementById('app').innerHTML = ev.data
  }
  window.w.onerror = err => {
    w.terminate()
    console.log(err.filename, err.lineno, err.message)
  }
  function sendMessage() {
    const msg = document.getElementById('msg')
    window.w.postMessage(msg.value)
  }
  function stopWorker() {
    window.w.terminate()
  }
}
/*
*   主线程中的api, worker表示Worker实例:
*     worker.postMessage: 主线程往worker线程发消息, 消息可以是任何类型的数据
*     worker.terminate: 主线程关闭worker线程
*     worker.onmessage: 指定worker线程发消息时的回调, 也可以通过worker.addEventListener('message', cb)的方式
*     worker.onerror: 指定worker线程发生错误时的回调, 也可以worker.addEventListener('error', cb)
*   worker线程中全局对象为self, 代表子线程自身, 这是this指向self, 上有一些api:
*     self.postMessage: worker线程往主线程发送消息, 类型同上
*     self.close: worker线程关闭自己
*     self.onmessage: 指定主线程发worker线程消息时的回调, 也可以self.addEventListener('message', cb)
*     self.onerror: 指定worker线程发生错误时的回调, 也可以用onerror事件绑定, 同上
*   而 w.postMessage(aMessage, transferList) 方法接收两个参数, aMessage可以传递任何类型数据包括对象, 这种通信是拷贝关系, 即传值而不是传址
* , Worker对通信内容的修改, 不会影响到主线程, 浏览器内部先将通信内容串行化, 然后把串行化后的字符串发送给worker, 后者再将它还原;
*   第二个参数transferList是可选的对象数组参数, 用于传递所有权, 如果一个对象所有权被转移, 在发送它的上下文中将变为不可用(中止), 并且只有在它被发送到的worker中可用, 转移
* 对象是如ArrayBuffer, MessagePort或ImageBitmap的实例对象, transferList数组中不可传入null
* */
/*
* 场景: 1. 加密数据, 加密大量数据或解密算法复杂时耗费大量计算资源, 导致UI线程无反应
*      2. 预取数据, 由于Web Worker可以使用XMLHttpRequest, 可以提前使用Worker线程获取数据
*      3. 预渲染, 有些渲染场景, 比如复杂的canvas需要计算反射,折射,光影,材质等, 这些计算逻辑可以使用Worker线程来执行, 也可以使用多个Worker线程
*      4. 复杂数据处理场景, 某些检索,排序,过滤,分析会非常耗时
*      5. 预加载图片, 有时候一个页面有很多图片, 或者有几个很大的图片的时候, 如果业务逻辑不考虑懒加载, 也可以使用Web Worker来加载图片
*      6. 轮询, 有时浏览器需要轮询服务器状态, 以便第一时间得知改变, 这个工作可以放在Worker里面
* */
/*
* 注意:
*   1. 虽然使用worker线程不会占用主线程, 但是启动worker会比较耗费资源
*   2. 主线程中使用XMLHttpRequest在请求过程中浏览器另外开了一个异步http请求线程, 但是交互过程中还是要消耗主线程资源
* */
