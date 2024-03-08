//    ES6提供了Map数据结构, 类似于对象, 也是键值对的集合, 但是键的范围不仅限于字符串, 各类型值包括对象都可以当作键, Map也实现了iterator接口, 所以
// 可以使用扩展运算符和 for...of... 进行遍历, Map的属性和方法:
// 1. size 返回Map的元素个数
// 2. set 增加一个新元素, 返回当前Map
// 3. get 返回键名对象的键值
// 4. has 检测Map中是否包含某个元素返回boolean值
// 5. clear 清空集合, 返回undefined

// 创建一个空mao
let m = new Map()

// 添加元素
m.set('name', '尚硅谷')
m.set('change', function () {
  console.log('改变')
})
let key = {
  school: 'ATGUIGU'
}
m.set(key, ['北京', '上海', '深圳'])

// 删除
m.clear()

// 遍历
for(let v of m) {
  console.log(v)
}

console.log(m)