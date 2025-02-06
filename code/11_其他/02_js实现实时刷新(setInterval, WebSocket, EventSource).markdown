## 1. 纯前端

使用`setInterval`控制`ajax`不断向服务器请求最新数据
```javascript
setInterval(function()) {
    $.get('/get/data-lsit', function (data, status) {
        console.log(data)
    })
}, 5000)
```

​	这样每隔5秒向后台请求一次数据, 但是有个问题, 我们钱没法控制网络稳定, 不能保证下次发请求的时候上次的请求结果已经顺利返回, 在多数场景下势必出现问题, 于是可以使用`setTimeout`配合递归解决

``````javascript
function poll() {
	setTimeout(function() {
		$.get('/get/data-list', function(data, status) {
			console.log(data)
			poll()
		})
	}, 5000)
}
``````

​	当结果返回之后再延时触发下一次请求, 这样至少可以保证数据返回的节奏是稳定的, 但是也存在问题, 首先没法保证两次请求的间隔时间完全一致, 切代码性能差, 代码结构差。

​	为了解决上述问题, 可以让服务端长时间和客户端保持链接进行数据互通, `H5`新增了`WebSocket`和`EventSource`用来实现长轮询

## 2. 服务器端

### `Websocket`

​	`WebSocket`是一种通讯手段, 基于TCP协议, 协议标识符是`ws`(加密连接使用`wss`), 它实现了浏览器与服务器的全双工通信, 拓展了浏览器与服务端的通信功能, 使服务端也能主动向客户端发送数据, 不收跨域的限制(需要后端配合)

​	`Websocket`用来解决`http`不能持久连接的问题,因为可以双向通信所以可以用来实现聊天室, 以及其他由服务器主动推送的功能例如实时天气、股票报价、余票显示、消息通知等。

### `EventSource`

​	`EventSource`官方名称Serve-sent events(缩写`sse`)服务端派发事件,`EventSource`基于`http`协议只是简单的单项通信, 实现了服务端推的过程客户端无法通过`EventSource`向服务端发送数据。

​	但IE没有良好的兼容, 有解决办法, 比如`npm install event-source-polyfill`。

​	`EventSource`虽然不能实现双向通信,但是在功能实际上也有优点, 比如可以自动重连接, `event IDs`, 以及发送随机事件的能力(`Websocket`要借助第三方库比如`socket.io`才能实现重连)

​	因为受单项通信的限制`EventSource`只能用来实现像股票报价、新闻推送、实时天气这些只需要发送消息给客户端场景中。`Eventsource`的使用更加便捷, 这是他的优点

## 3. 区别

1. `WebSocket`基于`TCP`协议, `EventSource`基于`http`协议
2. `EventSource`是单项通信, 而`WebSocket`是双向通信
3. `EventSource`只能发送文本, 而`WebSocket`支持发送二进制数据
4. 在实现上`EventSource`更简单
5. `EventSource`不借助第三方就有自动重连接以及发送随机事件的能力
6. `WebSocket`的资源占用过大, `EventSource`更轻量
7. `WebSocket`可以跨域, `EventSource`基于`http`跨域需要服务端设置请求头

## 4. `EventSource`的实现案例

​	`Content-Type:text/event-stream`请求头, 其实是`HTML5`的`EventSource`的一项`API`, 通过服务器推送实现实时通信

> 客户端代码
>
> ``````javascript
> // 实例化EventSource参数是服务端监听的路由
> var source = new EventSource('/EventSource-test')
> source.onopen = function(event) { // 与服务器连接成功回调
> 	console.log('成功与服务器连接')
> }
> // 监听从服务器发送来的所有没有指定事件类型的消息(没有event字段的消息)
> source.onmessage = function(event) { // 监听未命名事件
> 	console.log('未命名时间', event.data)
> }
> source.onerror = function(error) { // 监听错误
> 	console.log('错误')
> }
> // 监听指定类型的时间(可以监听多个)
> source.addEventListener("myEve", function(event) {
> 	console.log("myEve", event.data)
> })
> ``````
>
> 服务端代码
>
> ```javascript
> const fs = require('fs')
> const express = require('express')
> const app = express()
> 
> // 启动一个简易的本地server返回index.html
> app.get('/', (reg, res) => {
>     fs.stat('./index.html', (err, stats) => {
>         if(!err && stats.isFile()) {
>             res.writeHead(200)
>             fs.createReadStream('./index.html').pipe(res)
>         } else {
>             res.writehead(404)
>             red.end('404 Not Found')
>         }
>     })
> })
> 
> // 监听EventSource-test路由服务端返回事件流
> app.get('/EventSource-test', (ewq,res) => {
>     // 根据EventSource规范设置请求头
>     res.writeHead(200, {
>     	"Content-Type": "text/event-stream", // 规定把包头设置为 text/event-stream
>       	"Cache-Control": "no-cache" // 设置不对页面进行缓存
>     })
>     // 用write返回事件流, 事件流仅仅是一个简单的文本数据流, 每条消息以一个空行(\n)座位分割
>     res.write('注释' + '\n\n') // 注释行
>     res.write('data:' + '消息内容1' + '/n/n') // 未命名事件
>     
>     res.write( // 命名事件
>     	'event: myEve' + '\n' +
>    	'data:' + '消息内筒2' + '\n' +
>     	'retry:' + '2000' + '\n' +
>     	'id:' + '12345' + '\n\n'
>     )
>     
>     setInterval(() => { // 定时事件
>     	res.write('data:' + '定时消息' + '\n\n')
>     }, 2000)
> })
> 
> // 监听 6788
> app.listen(6788, () => {
>     console.log('server runing on port 67888 ...')
> })
> ```
>
> 

​	客户端访问http://127.0.0.1:6788/ 会看到如下输出:

​	![输出范例](https://i-blog.csdnimg.cn/blog_migrate/16b30eb2c3fa8f40c6ee7dc1fa5c3510.png)

## 5. `EventSource`总结

1. 事件流格式: 事件流格式只是一个简单的文本数据流, 文本应该使用`UTF-8`格式的编码, 每条消息后由一个空行作为分隔符, 以冒号开头的行作为注释行, 会被忽略
2. 注释: 注释行可以用来防止连接超时, 服务器可以定时发送一条消息注释行, 以保证连接不断
3. `EventSource`规范中规定了哪些字段:
   1. event: 事件类型, 如果指定了该字段, 则在客户端接受到该条消息时, 会在当前的`EventSource`对象上触发一个事件, 事件类型就是该字段的字段值, 可以使用`addEventListerner()`在当前`Eventsource`对象上监听任意类型的命名事件, 如果该条嘻嘻没有`event`字段, 则会触发`onmessage`属性上的事件处理函数
   2. data: 消息的数据字段, 如果该条消息包含多个data字段, 则客户端会用换行符把它们连接成一个字符串作为字段值
   3. id: 事件ID, 会成为当前`eventSource`对象的内部属性"最后一个事件ID"的属性值
   4. retry: 一个整数值, 指定了重新连接的时间(毫秒), 如果该字段不为整数则会被忽略

4. 重连: retry字段是用来指定重连事件的, 以node为例, node的特点是单线程异步`io`, 单线程意味着如果serve端报错服务就会停掉, 虽然在node开发过程中会处理掉这些异常, 但是一旦服务停掉了, 这时就需要用`pm2`之类的工具去做重启操作, 这时候server虽然正常了, 但是客户端的`EventSource`链接还是断开的, 这时候就需要重连
5. 案例中消息用\n结尾: \n是换行的转义字符, `EventSource`范围规定每条消息后面都由一个空行作为分隔符, 结尾加一个\n表示一个字段结束, 加两个\n表示一条消息结束(两个\n表示换行后由加了一个空行)
   一行文本中不包含冒号, 则整行文本会被解析成为字段名, 其字段值为空

## 6. `WebSocket`的实现案例

1. `WebSocket`的客户端原生`api`

   ```javascript
   // Websocket 对象作为一个构造函数, 用于新建WebSocket实例
   var ws = new WebSocket('ws://localhost:8080')
   
   // 用于指定连接成功后的回调函数
   ws.onopen = function(){}
   
   // 用于指定连接关闭后的回调函数
   ws.onclose = function(){}
   
   // 用于指定收到服务器数据后的回调函数
   ws.onmessage = function(){}
   
   // 实例对象的send()方法用于像服务器发送数据
   ws.send('data')
   
   // 用于指定报错时的回调函数
   socket.onerror = function(){}
   ```

   2. 服务端的`WebSocket`如何实现

      `npm`上有很多包对`websocket`做了实现, 比如`socket.io`、`WebSocket-Node`、`ws`等等

      `socket.io`: 一个`WebSocket`库, 包括了客户端的`js`和服务器端的`node.js`, 它会自动根据浏览器从`WebSocket`、`AJAX长轮询`、`Iframe流`等等方式中选择最佳的方式来实现网络实时应用(不支持`WebSocket`的情况会降级到`AJAX`轮询), 非常方便, 兼容性好, 支持的浏览器最低达`IE5.5`并屏蔽了细节差异和兼容性问题, 实现了跨浏览器/跨设备进行双向数据通信。
      
      `ws`: 不像`socket.io`模块, `ws`是一个单纯的`websocket`模块, 不提供向上兼容, 不需要在客户端挂额外的`js`文件, 在客户端不需要使用二次封装的`api`使用浏览器的原生`WebSocket API`即可通信

## 7. 基于`socket.io`实现`WebSocket`的双向通信

> 客户端代码
>
> ```javascript
> <button id="closeSocket">断开连接</button>
> <button id="openSocket">恢复连接</button>
> <script src="/socket.io/socket.io.js"></script>
> <script>
>  // 建立连接 默认指向 window.location
>  let socket = io(`http://127.0.0.1:6788`)
> 	openSocket.onclick = () => {
>      socket.open() // 手动打开socket也可以重新连接
>  }
>  closeSocket.onclick = () => {
>      socket.close() // 手动关闭客户端对服务器的链接
>  }
> 
>  socket.on('connect', () => { // 链接成功
>  	// socket.id 是唯一标识, 在客户端连接到服务器后被设置
>      console.log(socket.id)
>  })
> 
> socket.on('connect_error', (error) => {
>     console.log('连接错误')
> })
> socket.on('disconnect', (timeout) => {
>     console.log('断开连接')
> })
> socket.on('reconnect', (timeout) => {
>     console.log('成功重连')
> })
> socket.on('reconnect_error', (timeout) => {
>     console.log('重连错误')
> })
> 
> // 监听服务器返回事件
> socket.on('serverEve', (data) => {
>     console.log('serveEve', data)
> })
> 
> let num = 0
> setInterval(() => {
>     // 向服务端发送事件
>     soclet.emit('feEve', ++num)
> }, 1000)
> </script>
> ```
>
> 服务端代码
>
> ```javascript
> const app = require('express')()
> const server = require('http').Server(app)
> const io = require('socket.io')(server, {})
> 
> // 启动一个简易的本地server返回index.html
> app.get('/', (req, res) => {
>     res.sendfile(__dirname + '/index.html')
> })
> // 监听 6788
> server.listen(6788, () => {
>     console.log('server running on port 6788...')
> })
> 
> // 服务器监听所有客户端, 并返回该链接新对象
> // 每个客户端socket连接时都会触发connection事件
> let num = 0
> io.on('connection', (socket) => {
>     socket.on('disconnect', (reason) => {
>         console.log('断开连接')
>     })
>     socket.on('error', (error) => {
>         console.log('发生错误')
>     })
>     socket.on('disconnecting', (reason) => {
>         console.log('客户端断开但链接尚未离开')
>     })
>     
>     console.log(socket.id) // 获取当前连接进入的客户端的id
>     io.clients((error, ids) => {
>         console.log(ids) // 获取已连接的全部客户机的ID
>     })
>     
>     // 监听客户端发送的事件
>     socket.on('feEve', (data) => {
>         console.log('feEve', data)
>     })
>     // 给客户端发送事件
>     setInterval(() => {
>         socket.emit('serverEve', ++num)
>     }, 1000)
>     /*
>     	io.close() // 关闭所有连接
>     */
> })
> ```

`const io = require('socket.io')(server, {})`第二个参数是配置项, 可以传入如下参数

- `path '/socket.io'`捕获路径的名称
- `serveClient: false`是否提供客户端文件
- `pingInterval: 10000`发送消息的时间间隔
- `pingTimeout: 5000`在该时间下没有数据传输连接断开
- `origins: '*'`允许跨域
- ...

上面基于`socket.io`的实现中`express`作为`socket`通信的依赖服务基础

`socket.io`作为`socket`的通信模块, 实现了双向数据传输, 最后需要注意的是, 在服务器端`emit`区分以下三种情况:

- `socket.emit()`: 向建立该连接的客户端发送
- `socket.broadcast.emit()`: 向除去建立该连接的客户端的所有客户端发送
- `io.socket.emit()`: 向所有客户端发送 等于上两个的和
- `io.to(id).emit()`: 向指定id的客户端发送事件

## 8. 基于`ws`实现`WebSocket`双向通信

> 客户端代码
>
> ```javascript
> let num = 0
> let ws = new WebSocket('ws://127.0.0.1:6788')
> ws.onopen = (evt) => {
>     console.log('连接成功')
>     setInterval(() => {
>         ws.send(++ num) // 向服务器发送数据
>     }, 1000)
> }
> ws.onmessage = (evt) => {
>     console.log('收到服务端数据', evt.data)
> }
> ws.onclose = (evt) => {
>     console.log('关闭')
> }
> ws.onerror - (evt) => {
>     console.log('错误')
> }
> closeSocket.onclick = () => {
>     ws.close() // 断开连接
> }
> ```
>
> 服务端代码(node.js)
>
> ```javascript
> const fs = require('fs')
> const express = require('express')
> const app = express()
> 
> // 启动一个简易的本地的server返回index.html
> const httpServer = app.get('/', (req, res) => {
>     res.writeHead(200)
>     fs.createReadStream('./index.html').pipe(res)
> }).listen(6788, () => {
>     console.log('server running on port 6788...')
> })
> 
> // ws
> const WebSocketServer = require('ws').Server
> const wssOptions = {
>     server: httpServer
>     // port: 6789
>     // path: '/test'
> }
> const wss = mew WebSocketServer(wssOptions, () => {
>     console.log('server running on port ws 6789')
> })
> 
> let num = 1
> wss.on('connection', (wsocket) => {
>     console.log('连接成功')
>     
>     wsocket.on('message', (message) => {
>     console.log('收到消息', message)
>   })
>   wsocket.on('close', (message) => {
>     console.log('断开了')
>   })
>   wsocket.on('error', (message) => {
>     console.log('发生错误')
>   })
>   wsocket.on('open', (message) => {
>     console.log('建立连接')
>   })
> 
>   setInterval(() => {
>       esocket.send( ++ num )
>   }, 1000)
> })
> ```

上面代码中在`new WebSocketServer`的时候传入了`server: httpServer`目的是统一接口, 虽然`webSocketServer`可以使用别的端口, 但是统一端口还是更优的选择, 其实`express`没有直接占用6788端口, 而是调用了内置`http`模块创建了`http.Server`监听了6788, `express`只是把响应函数注册到该`http.Server`里面。类似的, `WebSocketServer`也可以把自己的响应函数注册到`http.Server`中, 这样同一个端口根据协议可以分别由`express`和`ws`处理, 我们拿到`express`创建的`http.Server`的引用, 再配置到`wssOptions.server`里让`WebSocketServer`根据我们传入的`http`服务来启动, 就实现了统一端口目的

要始终注意, 浏览器创建`WebSocket`时发送的仍然是标准`HTTP`请求, 无论是`WebSocket`请求还是普通`HTTP`请求, 都会被`http.Server`处理, 具体的处理方式是由`express`和`WebSocketServer`注入的回调函数实现的, `WebSocketServer`会首先判断请求是不是`WS`请求, 如果是则处理该请求, 否则该请求仍由`express`来处理, 所以`WS`的请求会直接由`WebsocketServer`处理, 它根本不经过`express`
