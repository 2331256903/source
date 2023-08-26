/**
 * npm全称Node Package Manager  Node的包管理工具
 * npm是Node官方内置的包管理工具
 * Node.js在安装时会自动安装npm, npm -v查看版本号
 * */

/**
 * 初始化, 创建一个空目录, 执行npm init
 * npm init命令将文件夹初始化为一个包, 交互式创建package.json文件
 * package.json是包的配置文件, 每个包都必须要有package.json
 * 形如:
 * {
 *  "name": "1-npm", #包的名字
 *  "version": "1.0.0", #包的版本
 *  "description": "", #包的描述
 *  "main": "index.js", #包的入口文件
 *  "scripts": "
 *    "test": "echo \"Error: no test specified\" && exit 1"
 *  ",
 *  "author": "", #作者
 *  "license": "ISC", #开源证书
 *  "devDependencies": {
 *    "express": "^4.18.2",
 *    "jquery": "^3.6.4",
 *    "koa": "^2.14.2",
 *    "koa-bodyparser": "3.2.0",
 *    "koa-router": "7.0.0",
 *    "mime": "1.3.4",
 *    "mz": "2.4.0",
 *    "nunjucks": "3.1.2"
 *  }, #开发依赖
 *  "dependencies": {
 *    "axios": "^1.4.0",
 *    "bootstrap": "^3.4.1",
 *    "less": "^4.1.3",
 *    "node.js": "^0.0.1-security",
 *    "request": "^2.88.2"
 *  } #生产依赖
 *}
 * 初始化时的一些注意事项:
 *   1. package name不能使用中文, 大写, 默认值是文件夹的名称, 所以文件夹的名称也不能使用中文或大写
 *   2. version 要求以x.x.x的形式定义, x必须是数字, 默认值是1.0.0
 *   3. ISC证书和MIT证书功能上是相同的
 *   4. package.json可以手动创建与修改
 *   5. 使用npm init -y 或者 npm init --yes极速创建package.json
 * */

/**
 * 搜索包:
 *  1. 命令行npm s/search 关键字  体验太差, 一般不用
 *  2. 网站搜索 网址 https://www.npmjs.com/
 * 下载包:
 *  npm install 或 npm i 加包名, 运行之后文件夹下会新增两个资源, package.json文件存放下载的包, package-lock.json 是包的锁文件, 用来锁定包的版本
 *  安装包之后, uniq就是当前这个包的一个依赖包, 简称为依赖, 包A中安装了包B, 则B是A的一个依赖包, 或者说A依赖B
 * */

/**
 * require导入npm包的基本流程
 *   1. 在当前文件夹下 node_modules中寻找同名的文件夹
 *   2. 在上级目录下的 node_modules中寻找同名文件夹, 直到找到磁盘根目录
 * require导入的是当前文件夹下node_modules文件夹下的同名文件夹
 * */

/**
 * 安装包依赖
 *  项目协作中常用命令 npm i 或 npm install, 该命令可以依据package.json和package-lock.json的依赖声明安装项目依赖
 *  node_module文件夹大多数情况都不会存入版本库, 因此多人协作拉取项目时通常先执行npm i拉取依赖
 * */

/**
 * 安装指定版本的包
 * npm i 包名 @ 版本号
 * */

/**
 * 删除依赖
 * npm r 包名 或 npm remove 包名
 * 全局删除
 * npm remove -g nodemon
 * */

/**
 * 配置命令别名
 * 通过配置命令别名可以更简单地执行命令
 * 配置package.json中的script属性
 *   {
 *     ...
 *     "scripts": {
 *       "server": "node ./03_server.js"
 *       "start": "node ./03_index.js"
 *     }
 *     ...
 *   }
 * 配置完成之后, 可以使用别名执行命令
 *   npm run server
 *   npm run start 或者 npm start, 只有start比较特殊, 可以省略run
 * 补充:
 *    1. npm start 是项目中常用命令, 一般用来启动项目
 *    2. npm run 有自动向上级目录查找的特性, 和require函数一样
 *    3. 对于陌生的项目, 可以通过查看script属性来参考项目的一些操作
 * */

/**
 * npm配置淘宝镜像
 *  直接配置:
 *    执行 npm config set registry https://registry.npmmirror.com/
 *  工具配置:
 *    使用nrm配置npm的镜像地址  npm registry manager
 *    1. 安装nrm
 *      npm i -g nrm
 *    2. 修改镜像
 *      nrm use taobao
 *    3. 检查是否配置成功
 *      npm config list 并检查registry地址是否为淘宝镜像
 * 补充:
 *   建议使用第二种方式, 因为后续修改起来会比较方便, 切换注册地址/镜像也很方便 nrm ls显示支持的镜像地址, nrm use upm切换到官方地址, 就可以上传包了
 *   npm使用率高于cnpm且npm配置淘宝镜像后速度快于cnpm
 * */
