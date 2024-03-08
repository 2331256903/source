// Object.fromEntries 创建一个对象, 接收一个二维数组或一个map
// 二维数组
const result = Object.fromEntries([
  ['name', '尚硅谷'],
  ['xueke', 'Java, 大数据, 前端, 云计算']
])

console.log(result)

// Map
const m = new Map()
m.set('name', 'ATGUIGU')
const result2 = Object.fromEntries(m)

console.log(m)


// ES8 中方法 Object.entries 用于将一个对象转化为一个二维数组
const arr = Object.entries({
  name: 'shangguigu',
  xueke: '语文,数学'
})

console.log(arr)