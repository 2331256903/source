// 1. Number.EPSILON 是 JS 中表示的最小精度, 接近 2.22 * 10的-16次方, 用于浮点数运算时对精度进行设置
console.log(0.1 + 0.2) // 0.3000000000000004
function equal(a) {
  if (Math.abs(a-b) < Number.EPSILON) {
    return true
  } else {
    return false
  }
}

console.log(0.1 + 0.2 === 0.3)
console.log(equal(0.1 + 0.2, 0.3))

// 2. 二进制和八进制
let b = 0b1010
let o = 0o777
let d = 100
let x = 0xff
console.log(x)

// 3. Number.isFinite 检测一个数是否为有限数
// 4. Number.isNaN 检测一个数是否为NaN
// 5. Number.isInteger 判断一个数是否为整数
// 6. Number.parseInt  Number.parseFloat  略
// 7. Math.trunc 将数字的小数部分抹掉
// 8. Math.sign 判断一个数的正负, 正数返回1, 负数返回-1, 0返回0