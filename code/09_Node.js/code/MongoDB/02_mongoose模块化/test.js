const db = require('./db/db')
const MovieModel = require('./models/MovieModel')

db(() => {
  // 电影的模型对象
  MovieModel.create({
    title: '123',
    director: '姜文'
  }, (err, data) => {
    if (err) {
      console.log(err)
      return
    }
    console.log(data)
  })
})

/**
 * 将来进行数据库操作时
 *  引入db, 导入db
 *  创建模型, 导入模型, 用模型对象操作即可
 * */
