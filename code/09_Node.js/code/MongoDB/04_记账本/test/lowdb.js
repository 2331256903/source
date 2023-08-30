// 导入lowdb  基本不用
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
// 获取db对象
const db = low(adapter)

// 初始化数据
db.defaults({ posts: [], user: {} }).write()

// 写入数据
db.get('posts').push({ id: 1, title: '好' }).write()
db.get('posts').unshift({ id: 0, title: '好' }).write() // 数组前面插入

// 获取数据
console.log(db.get('posts').value())

// 获取单条数据
let res2 = db.get('posts').find({ id: 1 }).value()
console.log(res2)

// 删除数据  返回值为被删除的数据
let res = db.get('posts').remove({ id: 3 }).write()
console.log(res)

// 更新数据
db.get('posts').find({ id: 1 }).assign({ title: '今天下雨了' }).write()
