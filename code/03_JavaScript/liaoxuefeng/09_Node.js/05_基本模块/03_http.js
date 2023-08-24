/* Node.js开发的目的就是为了用JS编写Web服务器程序, 学习如何将JS应用在后端开发 */
/* Http协议
*   Web应用中, 服务器把网页传给浏览器, 实际上就是把网页的HTML代码发送给浏览器, 让浏览器显示出来, 而浏览器和服务器之间的传输协议是HTTP
*     HTML是一种用来定义网页的文本
*     HTTP是在网络上传输HTML的协议, 用于浏览器和服务器的通信
* */
/* Chrome 浏览器的开发者工具中的NetWork */
/*
*   Elements 显示网页的结构, NetWork显示浏览器和服务器的通信, 点击Network确保红灯亮着, Chrome就会记录所有浏览器和服务器之间的通信, 当我们在地址栏
* 输入www.sina.com.cn时, 浏览器将显示新浪的首页, 在这个过程中, 通过Network的记录, 在Network中定位到第一条记录并点击, 右侧将显示Request Headers
* 点击右侧的view source, 就能考到浏览器发给新浪服务器的请求
*
* */

/* General
2 / 181 requests
7.5 kB / 1.0 MB transferred
42.6 kB / 2.9 MB resources
Finish: 2.6 min
DOMContentLoaded: 1.24 s
Request URL: https://www.sina.com.cn/api/hotword.json
Request Method: GET
Status Code: 200 (from disk cache)
Remote Address: 117.25.153.215:443
Referrer Policy: unsafe-url
*/
/* Response Headers
Age: 101
Ali-Swift-Global-Savetime: 1692341558
Cache-Control: max-age=120
Content-Encoding: gzip
Content-Length: 1009
Content-Type: application/json
Date: Fri, 18 Aug 2023 06:52:38 GMT
Eagleid: 7519999b16923416593785038e
Edge-Copy-Time: 1692341554323
Etag: "64df14a0-a03"
Expires: Fri, 18 Aug 2023 06:54:34 GMT
Last-Modified: Fri, 18 Aug 2023 06:50:08 GMT
Server: Tengine
Timing-Allow-Origin: *
Vary: Accept-Encoding

Via: http/1.1 cmcc.guangzhou.union.64 (ApacheTrafficServer/6.2.1 [cRs f ]), cache11.l2cn2656[0,0,200-0,H], cache1.l2cn2656[1,0], vcache8.cn2061[0,0,200-0,H], vcache5.cn2061[5,0]
X-Cache: HIT TCP_MEM_HIT dirn:11:197674810
X-Swift-Cachetime: 118
X-Swift-Savetime: Fri, 18 Aug 2023 06:52:40 GMT
X-Via-Cdn: f=aliyun,s=vcache5.cn2061,c=60.173.216.119;f=sinaedge,s=ctc.guangzhou.union.56.nb.sinaedge.com,c=153.37.73.144;f=Edge,s=cmcc.guangzhou.union.64,c=10.31.54.56
X-Via-Edge: 16923415581199049259938361f0a79c31ae2
X-Via-Ssl: ssl.41.sinag1.bx.lb.sinanode.com*/
/* Request Header
Accept: application/json, text/javascript, *!/!*; q=0.01
Referer: https://www.sina.com.cn/
Sec-Ch-Ua: "Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"
Sec-Ch-Ua-Mobile: ?0
Sec-Ch-Ua-Platform: "Windows"
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36
X-Requested-With: XMLHttpRequest
*/

/*
* GET/ HTTP/1.1
*   GET表示一个读取请求, 将从服务器获取网页数据, /表示URL的路径, URL总是以/开头, /就是表示首页, 最后的HTTP/1.1 指示采用的HTTP协议版本是1.1
* ,1.1版本的HTTP协议相较于1.0版本允许多个HTTP请求复用一个TCP链接, 以加快传输速度
* 从第二行开始每一行都是键值对
* Host: www.sina.com.cn
*   表示请求的域名是www.sina.com.cn, 如果一台服务器有多个网站, 服务器就要通过Host来区分浏览器请求的是哪个网站
* */

/* Response Headers
*  HTTP响应主要分为Header和Body两个部分, Body是可选项, 在NetWork中看到的Header最重要的几行如下:
*    200 OK:  200 表示是一个成功的响应, 后面的OK是说明, 失败的响应有404 Not Found等
*    Content-Type: text/http:  Content-Type指示响应的内容, 这里是text/http 表示HTML网页, 浏览器就是依靠Content-Type来判断响应的内容是网页还是图片
*      , 是视频还是音乐, 浏览器并不靠URL来判断响应的内容, 所以即使URL是http://example.com/abc.jpg, 它也不一定就是图片
* */

/*
*   HTTP响应的Body就是HTML源码, 当浏览器读取到网页的HTML源码后它会解析HTML, 显示页面, 然后根据里面的各种连接, 在发送HTTP请求给新浪服务器, 拿到相应
* 的图片, 视频, Flash, JavaScript脚本, CSS的各种资源, 最终显示出一个完整的页面, 所以在Network下能看到很多的额外HTTP请求
* */

/*
* 总结一下HTTP请求的流程:
*   1. 浏览器首先向服务器发送HTTP请求, 包括:
*     方法: GET 还是 POST, GET仅请求资源, POST会附带用户数据
*     路径: /full/url/path
*     域名: 由Host头指定: Host: www.sina.com.cn
*     以及其他相关的Header
*     如果是POST, 那么请求还包括一个Body包含用户数据
*   2. 服务器向浏览器返回HTTP响应, 相应包括:
*     响应代码: 200 表示成功, 3xx表示重定向, 4xx表示客户端发送的请求有误, 5xx表示服务器端处理时发生了错误
*     响应类型: 由 Content-Type 指定, 例如 Content-type: text/http;charset=utf-8表示相应类型是HTML文本, 编码为utf-8;
*             Content-type: image/jpeg 表示相应类型是JPEG格式的图片
*     以及其他相关的Header
*     通常服务器的HTTP响应会携带内容, 也就是有一个body包含响应的内容, 网页的HTML源码就在Body中
*   3. 如果浏览器还需要继续向服务器请求其他资源, 比如图片, 就再次发出HTTP请求, 重复步骤1和2
*   Web采用的HTTP协议采用非常简单的请求-响应模式, 从而大大简化了开发, 当我们编写一个页面时, 只需要在HTTP响应中把HTML发送出去, 不需要考虑如何附带图片视频等
* 浏览器如果需要请求图片和视频, 它会发送另一个HTTP请求, 因此一个HTTP请求只处理一个资源
*   HTTP协议同时具备极强的扩展性, 虽然浏览器请求的是http://www.sina.com.cn/的首页, 但是新浪在HTML中可以链入其他服务器的资源,比如
* <img src="http://i1.sinaimg.cn/home/2013/1008/U8455P30DT20131008135420.png">, 从而将请求压力分散到各个服务器上, 并且一个站点可以链接
* 到其他站点, 无数个站点互相链接起来, 就形成了World Wide Web, 简称www
* */

/* HTTP格式
* 每个HTTP请求和响应都遵循相同的格式, 一个HTTP包含Head和Body两个部分, 其中Body是可选的
* */
// HTTP协议是一种文本协议, 因此格式也非常简单, HTTP GET请求的格式
/*
GET /path HTTP/1.1
Header1: Value1
Header2: Value2
Header3: Value3
*/
// 每个Header一行一个, 换行符是\r\n
// HTTP POST请求的格式
/*
POST /path HTTP/1.1
Header1: Value1
Header2: Value2
Header3: Value3

body data goes here...
*/
// 当遇到连续的两个\r\n时, Header部分结束, 后面的数据全是Body
// HTTP响应的格式:
/*
200 OK
Header1: Value1
Header2: Value2
Header3: Value3

body data goes here...
*/
/*  HTTP的响应如果包含body, 也是两个连续的\r\n来分割的, 注意, Body的数据类型有Content-type头来确定, 如果是网页, Body就是文本, 如果是图片,
* Body就是图片的二进制数据
*   当存在Content-Encoding时, Body数据是被压缩的, 常见的压缩方式是gzip, 所以看到Content-Encoding: gzip时, 需要将Body数据先解压缩, 才能得到
* 真正的数据, 压缩的目的在于减少Body的大小, 加快网络传输
* */

/* HTTP服务器 */
/*
*   要开发HTTP服务器程序, 从头处理TCP链接并解析HTTP是不现实的, 这些工作实际上已经由Node.js自带的Http模块完成了, 应用程序并不直接和Http协议打交道,
* 而是操作Http模块提供的request和response对象
*   request对象封装了HTTP请求, 调用request对象的属性和方法就可以拿到所有HTTP请求的信息,
*   response对象封装了HTTP响应, 操作response对象的方法, 就可以把HTTP响应返回给浏览器
*   用Node.js实现一个HTTP服务器程序非常简单, 实现一个最简单的Web程序hello.js, 它对于所有请求都返回Hello World
* */
let http = require('http')
// 创建http server, 并传入回调函数
let server = http.createServer(function (request, response) {
  // 回调函数接收request和response对象
  // 获得HTTP请求的method和url
  console.log(request.method + ':' + request.url)
  // 将HTTP响应200写入response, 同时设置Content-type: text/http
  response.writeHead(200, {'Content-type':'text/http'})
  // 将HTTP响应的HTML导入response
  response.end('<h1>Hello World!</h1>')
})
// 让服务器监听8000端口
server.listen(8000)
console.log('Server is running at http://192.168.1.148:8000/')
// 直接打开浏览器输入http://localhost:8000 即可看到响应内容
// 同时在命令提示符窗口, 可以看到程序打印的请求信息: GET: /   GET: /favicon.ico
// 这就是第一个HTTP服务器程序!!!

/* 文件服务器
* 是专门用于存储和管理文件的服务器, 允许多台计算机通过网络访问共享的文件和资源, 实现文件的共享和资源管理
* */
/*  继续扩展上面的Web程序, 可以设定一个目录, 然后让Web程序变成一个文件服务器, 要实现这一点, 只需要解析request.url中的路径, 然后在本地找到对应的文件,
* 把文件内容发送出去即可
*   解析URL需要用到Node.js提供的url模块, 通过parse()将一个字符串解析为一个Url对象:
* */
let url = require('url')
console.log(url.parse('http://user:pass@host.com:8080/path/to/file?query=string#hash'))
/* 结果如下
Url {
  protocol: 'http:',
  slashes: true,
  auth: 'user:pass',
  host: 'host.com:8080',
  port: '8080',
  hostname: 'host.com',
  hash: '#hash',
  search: '?query=string',
  query: 'query=string',
  pathname: '/path/to/file',
  path: '/path/to/file?query=string',
  href: 'http://user:pass@host.com:8080/path/to/file?query=string#hash' }
*/
/* 处理本地文件目录需要使用Node.js提供的path模块, 它可以方便地构造目录 */
let path = require('path')
// 解析当前目录
let workDir = path.resolve('.') // '/Users/michael'
// 组合完整的文件路径: 当前目录+'pub'+'index.http'
let filePath = path.join(workDir, 'pub', 'index.http') // '/User/michael/pub/index.http
/* 使用path模块可以正确处理操作系统相关的文件路径, 在Windows系统下, 返回的路径类似于C:\Users\michael\static\index.http, 这样我们就不关心怎么拼接路径了 */

/*实现一个文件服务器file_server.js*/
let
  fs = require('fs')
// 从命令行参数获取root目录, 默认是当前目录
let root = path.resolve(process.argv[2] || '.')
/* process对象是一个全局变量, 它提供当前Node.js的有关信息, 以及控制当前Node.js进程, 因为是全局变量所以无需使用require
*   process.argv属性返回一个数组, 这个数组包含了启动Node.js的可执行文件所在的绝对路径
*   process.argv[0] 返回启动Node.js进程的可执行文件所在的绝对路径
*   process.argv[1] 为当前执行的JS文件路径
*   2~n: 传入的命令参数
* */
console.log('Static root dir:' + root)
// 创建服务器
let server2 = http.createServer(function (request, response) {
  // 获得URL的path, 类似'/css/bootstrap.css'
  let pathname = url.parse(request.url).pathname
  // 获得对应的本地文件路径, 类似'/srv/www/css/bootstrap.css'
  let filepath = path.join(root, pathname)
  // 获取文件状态
  fs.stat(filepath, function(err, stats) {
    if (!err && stats.isFile()) {
      // 没有出错且文件存在
      console.log('200', request.url)
      // 发送200响应
      response.writeHead(200)
      // 将文件流导向response
      fs.createReadStream(filePath).pipe(response)
    } else {
      // 出错了或者文件不存在
      console.log('404' + request.url)
      // 发送404响应
      response.writeHead(404)
      response.end('404 Not Found')
    }
  })
})
server2.listen(8001)
console.log('Server is running at http://192.168.1.148:8001/')
/*
* 没有必要手动读取文件内容, 由于response对象本身是一个Writable Stream, 直接用pipe()方法就实现了自动读取文件内容并输出到HTTP响应
* 在命令行运行node file_server.js /path/to/dir, 把/path/to/dir改成本地的一个有效的目录, 然后在浏览器中输入http://localhost:8080/index/http
* 只要当前目录下存在文件index.http, 服务器就可以把内容发送给浏览器, 观察控制台输出:
*   200 /index.http
*   200 /css/uikit.min.css
*   200 /js/jquery.min.js
*   200 /fonts/fontawesome-webfont.woff2
* 第一个请求是浏览器请求index.html页面, 后续请求是浏览器解析HTML后发送的其他资源请求
* */
