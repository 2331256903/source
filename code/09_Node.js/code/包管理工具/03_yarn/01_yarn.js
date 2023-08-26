/**
 * yarn是Fackbook在2016年推出的新的JS包管理工具, 网址: https://yarnpkg.com/
 * 特点:
 *   1. 速度快, yarn缓存了每个下载过的包, 所以再次使用时无需重复下载, 同时利用并行下载以最大化资源利用率
 *   2. 安全, 执行代码前, yarn会通过算法校验每个安装包的完整性
 *   3. 可靠, 使用详细, 简洁的锁文件格式和明确的安装算法, 保证在不同系统上无差异工作
 * */

/**
 * 安装
 *  npm i -yarn
 * 初始化
 *  yarn init
 * 增加
 *  yarn add 包名
 * 全局安装 但是使用yarn全局安装的包需要配置到环境变量的path中
 *  yarn global add
 * 获取全部包
 *  yarn
 * 移除
 *  yarn remove 包名
 * 命令别名
 *  和npm一样, 但不需要run
 * 配置淘宝镜像
 *  yarn config set registry https://registry.npmmirror.com/
 *  可以通过yarn config list来查看yarn的配置项
 * */

/**
 * yarn 和 npm 的选择
 *  个人项目根据喜好来
 *  公司项目要根据项目代码来选, 可以通过锁文件判断项目的包管理工具
 *    npm的锁文件为 package-lock.json
 *    yarn的锁文件为yarn.lock
 *  注意: 切记包管理工具不要混着用!! 多人项目可能出现包版本问题, 个人项目无所谓
 * */
