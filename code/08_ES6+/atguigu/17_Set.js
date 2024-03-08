// ES6提供了新的数据结构Set(集合), 类似数组, 但成员的值都是唯一的, 集合实现了iterator接口, 所以可以使用扩展运算符和for...of进行遍历
// Set的属性和方法:
//   1. size 返回集合的元素个数
//   2. add 增加一个新元素, 返回当前集合
//   3. delete 删除元素, 返回boolean值
//   4. has 集合中是否包含某个元素, 返回boolean值

// 声明一个set
let s = new Set()
let s2 = new Set(['大事', '小事', '坏事', '大事'])
console.log(s2)  // set会自动为集合元素去重

// 元素个数
console.log(s2.size)
// 添加新的元素
s2.add('喜事')
// 删除元素
s2.delete('坏事儿')
// 检测
console.log(s2.has('好事'))
// 遍历
for(let v of s2) {
  console.log(v)
}
// 清空
s2.clear()
console.log(s2)