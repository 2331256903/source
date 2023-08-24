// 声明一个函数
function tiemo() {
  console.log('work')
}
function niejiao() {
  console.log('work2')
}

// 暴露数据  module.export属性
/*module.exports = {
  tiemo,
  niejiao
}*/

// exports 暴露数据  和上面不同, 这里的exports是独立的变量
/*exports.niejiao = niejiao
exports.tiemo = tiemo*/

/**
 * 注意:
 *  1. module.exports可以暴露任意类型数据
 *  2. 不能使用 exports = 'xxx' 的给exports赋值的形式暴露
 *    因为内部 exports = module.exports = {} 空对象, 且require在返回接口时返回的是目标模块中module.exports的值而不是export的值
 *    直接给exports赋值时module.exports依然是空对象, 而只用exports.xxx = xxx 是在往对象中添加属性, module.exports和exports都是引用类型的数据,
 *  存的都是变量的地址, 引用类型直接赋值拷贝是浅拷贝, 只是复制地址, export通过.添加数据后, module.export也有这个数据
 * */
