/* 编写View */
/*
*   编写View的时候实际上是在编写HTML页, 为了让页面看起来美观大方, 使用一个现成的css框架很有必要, 使用Bootstrap这个CSS框架,从首页下载zip包后解压,
* 将所有静态资源文件放到/static 目录下
*   这样在编写HTML的时候, 可以直接用Bootstrap的CSS
*   将所有的静态资源文件全部放入/static 目录, 目的就是能统一处理静态文件, 在koa中,需要编写一个middleware处理以/static/ 开头的URL
*   见static-files.js
* */
