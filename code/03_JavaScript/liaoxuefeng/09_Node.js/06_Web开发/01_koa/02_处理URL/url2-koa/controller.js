const fs = require('fs')
/* 上述的打断代码看起来人仍然有些费劲, 拆成更小单元的函数 */
/* 确保每个函数功能非常简单, 一眼就能看明白, 是代码可维护的关键 */
function addMapping(router, mapping) {
  for (let url in mapping) {
    if (url.startsWith('GET')) {
      let path = url.substring(4)
      router.get(path, mapping[url])
      console.log(`register URL mapping: GET ${path}`)
    } else if (url.startsWith('POST')) {
      let path = url.substring(5)
      router.post(path, mapping[url])
      console.log(`register URL mapping: POST ${path}`)
    } else {
      console.log(`invalid URL: ${url}`)
    }
  }
}

function addControllers(router) {
  let files = fs.readdirSync(__dirname + '/controllers')
  let js_files = files.filter((f) => {
    return f.endsWith('.js')
  })
  for (let f of js_files) {
    console.log(`process controller:${f}...`)
    let mapping = require(__dirname + '/controllers/' + f)
    addMapping(router, mapping)
  }
}

module.exports = function (dir) {
  let
    controllers_dir = dir || 'controllers', // 如果不传参, 扫描目录默认为controllers
    router = require('koa-router')()
    addControllers(router, controllers_dir)
  return router.routes()
}
