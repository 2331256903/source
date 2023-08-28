/**
 * 通过isLogin决定最终的输出内容
 * true 输出 <span>欢迎回来</span>
 * false 输出 <button>登录</button> <button>注册</button>
 * */
const ejs = require('ejs')
// 变量
let isLogin = true

// 原生JS
// if (isLogin) {
//   console.log('<span>欢迎回来</span>')
// } else {
//   console.log('<button>登录</button> <button>注册</button>')
// }

// EJS实现
let result = ejs.render(`
  <% if (isLogin) { %>
  <span>欢迎回来</span>
  <% } else { %>
  <button>登录</button> <button>注册</button>
  <% } %>
`, { isLogin })

console.log(result)

/* 外部html同理, 不写了, 参考01和02 */
