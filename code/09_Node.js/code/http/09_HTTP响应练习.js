/* 练习
* 搭建HTTP服务, 响应一个4行3列的表格, 并且要求表格有隔行换色效果, 且点击单元格能高亮显示
* */
const http = require('http')
let server = http.createServer((request, response) => {
  response.end(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Title</title>
    </head>
    <style>
      td{
        padding: 20px 40px;
      }
      table tr:nth-child(odd){
        background-color: #aef;
      }
      table tr:nth-child(even){
        background-color: #fcb;
      }
      table, td{
        border-collapse: collapse;
      }
    </style>
    <body>
      <table border="1">
        <tr><td></td><td></td><td></td></tr>
        <tr><td></td><td></td><td></td></tr>
        <tr><td></td><td></td><td></td></tr>
        <tr><td></td><td></td><td></td></tr>
      </table>
      <script>
        // 获取所有的td
        let tds = document.querySelectorAll('td')
        // 遍历
        tds.forEach(item => {
          item.onclick = function() {
            this.style.backgroundColor = '#222'
          }
        })
      </script>
    </body>
    </html>
  `)
})
server.listen(9000, () => {
  console.log('服务已经启动...')
})
