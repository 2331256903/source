/* Buffer 缓冲区, 是一个类似于Array的对象, 用于表示固定长度的字节序列(一段固定长度的内存空间, 用于处理二进制数据) */
/* Buffer特性:
  1. 大小固定且无法调整
  2. 性能较好, 可以用于直接操作计算机内存
  3. 每个元素的大小为 1 字节(byte)
*/
/* Buffer创建 */
// 1. alloc
// 创建一个10字节的Buffer, 其中Buffer是Node.js的内置模块, 启动时已经自动加载无需手动导入, 可以理解为全局变量
// alloc 为 Buffer 的方法, 使用alloc创建的Buffer每一个二进制位都会归零
let buf = Buffer.alloc(10)
console.log(buf)
// 2. allocUnsafe
// allocUnsafe方法创建的Buffer可能包含旧的内存数据(脏数据), 由于不需要归零操作, 执行速度很快
let buf_2 = Buffer.allocUnsafe(10000)
console.log(buf_2) // 键盘方向上键直接调用命令
// 3. from
// Buffer.from 可以将一个数组或字符串转为一个Buffer
let buf_3 = Buffer.from('hello') // <Buffer 68 65 6c 6c 6f>
// Buffer.from 进行转换时, 每一个字母都会转换成这个字符在unicode码表(兼容ASCII编码表)中对应的数字, 这个数字会转成二进制存到内存中
console.log(buf_3)
let buf_4 = Buffer.from([105, 108, 111, 118, 101, 121, 111, 117])
console.log(buf_4) // 每一个数字转成二进制存到buf中, 但console.log 出来的是16进制
