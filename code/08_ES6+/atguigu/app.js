// 静态导入
//import * as m1 from "./hello"

// 获取元素
const btn = document.getElementById("btn")
btn.onclick = function() {
  // 使用import函数进行动态导入, 返回值为一个promise对象, 且成功时返回的值就是模块中暴露的对象
  import('./hello').then(module => {
    module.hello()
    console.log(module)
  })
}