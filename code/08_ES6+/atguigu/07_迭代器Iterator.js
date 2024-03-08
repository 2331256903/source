/*
* 迭代器(Symbol.iterator)是一种接口, 为各种不同的数据结构提供统一的访问机制, 任何数据结构只要部署Iterator接口, 就可以完成遍历操作
* 1. ES6创造了一种新的遍历命令for...of循环, Iterator接口主要使用for...of遍历
* 2. 原生具备Iterator接口的数据:
*   Array, Arguments, Set, Map, String, TypedArray 定型数组, NodeList
* 3. 工作原理
*   1). 创建一个指针对象, 指向当前数据结构的起始位置
*   2). 第一次调用对象的 next 方法, 指针自动指向数据结构的第一个成员
*   3). 接下来不断调用 next 方法, 指针一直往后移动直到指向最后一个成员
*   4). 每次调用 next 方法返回一个包含 value 和 done 属性的对象
* */
// 声明一个数组
const arr = ["1", "2", "3"]
// 使用 for...of 遍历数组  for...of循环的items保存的是键名, for...in循环保存的是键值
/*for (let v of arr) {
  console.log(v)
}*/
let iterator = arr[Symbol.iterator]()
// 调用对象的 next 方法  每次调用 next 方法后都返回一个新值, 和 done 属性表示循环是否结束
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())


/* 迭代器应用, 自定义遍历对象  遍历对象内指定的属性*/
// 声明一个对象
const banji = {
  name: '一班',
  stus: [
    'xiaoming',
    'xiaohong',
    'xiaotian',
    'knight'
  ],
  // 手写一个迭代器
  [Symbol.iterator]() {
    // 索引变量
    let index = 0
    let _this = this
    return {
      next: function () {
        if (index > _this.stus.length) {
          const result = { value: _this.stus[index], done: false}
          // 下标自增
          index++
          // 返回结果
          return result
        } else {
          return { value: undefined, done: true}
        }
      }
    }
  }
}