// 大整形 在普通的数字后加n就表示大整型数, 用于更大数值的运算
let n = 521n
console.log(n, typeof(n))

// 函数 BigInt 将普通的值转换为大整形, 但是无法将浮点型数转化为整数
let n2 = 123
console.log(BigInt(n))

let max = Number.MAX_SAFE_INTEGER
console.log(max) // 9007199254740991
console.log(max + 1) // 9007199254740992
console.log(max + 2) // 9007199254740992 此时出现问题, 无法进行更大整数的计算, 可以借助BigInt的转化处理

console.log(BigInt(max))
console.log(BigInt(max) + BigInt(1)) // 但是BigInt无法和普通整数做运算
console.log(BigInt(max) + BigInt(2))