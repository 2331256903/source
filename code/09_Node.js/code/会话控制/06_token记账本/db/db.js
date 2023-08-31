/**
 * @params {*} success 数据库链接成功的回调
 * @params {*} error 数据库链接失败的回调
 * */

const config = require('../config/config')
const mongoose = require("mongoose");
module.exports = function (success, error) {
  // 优化: 不在test做失败回调, 则需要在db中就做一个判断
  // 如果err不等于一个函数, 连接失败, 为其设置一个默认值
  if (error !== 'function') {
    error = () => {
      console.log('连接失败')
    }
  }
  const mongoose = require('mongoose')
  mongoose.set('strictQuery', true)
  /** 优化数据配置信息的来源, 以后修改直接在config下config.js进行修改即可 */
  const {DBHOST, DBPORT, DBNAME} = config
  mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  mongoose.connection.once('open', () => {
    success()
  })
  mongoose.connection.on('error', (err) => {
    error(err)
  })
  mongoose.connection.on('close', () => {
    console.log('连接关闭')
  })
}
