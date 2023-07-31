// 需求 复制mp3文件
const fs = require('fs')
const process = require('process')  // process是Node.js的一个内置模块, 可以通过它的一个方法 memoryUsage 获取代码的内存占用量
/*// 方式一: readFile
// 读取文件内容
let data = fs.readFileSync('../01_HTML/atguigu/source/不熄的光(《火影忍者》手游重燃主题曲).mp3')
// 写入文件
fs.writeFileSync('../01_HTML/atguigu/source/不熄的光(《火影忍者》手游重燃主题曲)-2.mp3', data)*/


// 方式二: 流式操作  流式操作大文件更好, 所占用的资源更少(此时流式操作理想状态下只需要64kb的空间, 但是由于读取速度一般比写入速度快, 所以实际上远不止这么低的占用)
//  而小文件操作时, 流式操作反而会占用更大的空间
// 创建读取流对象
const rs = fs.createReadStream('../01_HTML/atguigu/source/不熄的光(《火影忍者》手游重燃主题曲).mp3')
// 创建写入流对象
const ws = fs.createWriteStream('../01_HTML/atguigu/source/不熄的光(《火影忍者》手游重燃主题曲)-3.mp3')

// 为读取流绑定data事件
rs.on('data', chunk => {
  ws.write(chunk)
})
console.log(process.memoryUsage())

rs.pipe(ws) // 该方法也能实现文件复制 管道
