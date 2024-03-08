// String.prototype.matchAll 方法用来得到正则批量匹配的结果, 在正则匹配提取数据中是非常有用的方法, 尤其是用于页面提取数据, 爬虫等
let str = `
  <ul>
    <li>
      <a>肖生克的救赎</a>
      <p>上映日期: 1994-09-10</p>
    </li>
    <li>
      <a>阿甘正传</a>
      <p>上映日期: 1994-07-06</p>
    </li>
  </ul>
  `
// 之前使用的exec和循环进行批量提取数据, 此时有了 matchAll 后会非常简单
const reg = /<li>.*?<a>(.*?)<\/a>.*?<p>(.*?)<\/p>/sg

// 调用方法
const result = str.matchAll(reg)
console.log(result) // result 为一个可迭代对象, 拥有next()方法, 因此可以使用扩展运算符展开或者使用for of进行遍历
// for of
for(let v of result) {
  console.log(v)
}
// ...
const arr = [...result]
console.log(arr)