// 声明对象
const school = {
  name: '尚硅谷',
  cities: ['北京', '上海', '深圳'],
  xueke: ['前端', 'Java', '大数据', '运维']
}

// 获取对象所有的键
console.log(Object.keys(school))
// 1. 获取对象所有的值
console.log(Object.values(school))
// 2. entries  返回值是一个数组, 其中每一个元素也是一个数组, 数组中的元素为键和值   方便创建一个Map
console.log(Object.entries(school))
// 创建Map  将对象转换成Map
const m = new Map(Object.entries(school))
console.log(m.get('name'))

// 3. getOwnPropertyDescriptors 获取对象属性的描述对象, 用于进行深层次的对象属性的克隆
console.log(Object.getOwnPropertyDescriptors(school))

const obj = Object.create(null, {
  name: {
    // 设置值
    value: '尚硅谷',
    // 属性特性
    writable: true, // 是否可写
    configurable: true, // 是否可以删除
    enumerable: true // 是否可以枚举
  }
})