/* Buffer与字符串的转换 */
let buf_4 = Buffer.from([105, 108, 111, 118, 101, 121, 111, 117])
console.log(buf_4.toString()) // 默认采用utf-8的方式进行转换

// [下标] 的方式对buffer里的元素进行操作
let buf = Buffer.from('hello')
console.log(buf[0]) // 104 (默认为十进制, 可以加个.toString(2)来进行数字的进制转换)
console.log(buf[0].toString(2)) // 01101000

// 修改
buf[0] = 95
console.log(buf)


/* 溢出 */
let buf_2 = Buffer.from('hello')
buf_2[0] = 361 // 8个二进制位最大存储255, 溢出时修改数值, 内部会舍弃高位数字, 此处丢掉全部高于8位的数
// 例如 361 二进制为 0001 0110 1001 => 最后写入时为 0110 1001 实际存值为69

/* 中文 */
let buf_3 = Buffer.from('你好')
console.log(buf_3) // <Buffer e4 bd a0 e5 a5 bd>  utf-8的中文一般占用三个字节

