// Object.is 判断两个值是否完全相等
console.log(Object.is(120,120)) // 作用基本等于 ===, 但是可以用于比较NaN

// Object.assign(模板, 覆盖的内容) 对象的合并  如果属性出现重名, 后面对象会覆盖前面对象的属性值
const config1 = {
  host: 'localhost',
  port: 3306,
  name: 'root',
  pass: 'root',
  test: 'test'
}

const config2 = {
  host: 'http://atguigu.com',
  port: 33060,
  name: 'atguigu.com',
  pass: 'iloveyou'
}

Object.assign(config1, config2)

// Object.setPrototypeOf 设置原型对象 Object.getPrototypeOf 获取原型对象
const school = {
  name: '尚硅谷',
}
const cities = {
  xiaoqu: ['北京', '上海', '深圳']
}

Object.setPrototypeOf(school, cities)
console.log(school)