/**
 * cnpm是淘宝构建的npm.js的完整镜像, 也称为淘宝镜像, 网址https://npmmirror.com/
 * cnpm服务部署在国内阿里云服务器上, 可以提高包的下载速度
 * 官方也提供了一个全局工具包cnpm, 操作命令与npm大致相同, 但是cnpm只读, 无法上传包, 每10分钟同步一次npm, 且官方网站的搜索只支持单个包搜索
 * */

/**
 * 安装
 *  通过npm来安装cnpm工具
 *  npm install -g cnpm --registry=https://registry.npmmirror.com
 * */
