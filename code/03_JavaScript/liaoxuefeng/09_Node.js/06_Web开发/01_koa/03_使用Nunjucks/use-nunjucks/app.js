const nunjucks = require('nunjucks')
const path = require('path')

function createEnv(path, opts) {
  let
    /* 用opts.noCache || false这样的代码给每个参数加上默认值, 最后使用new nunjucks.FileSystemLoader('views')创建一个文件系统的加载器,
    * 从views目录读取模板 */
    autoescape = opts.autoescape === undefined ? true : opts.autoescape,
    noCache = opts.noCache || false,
    watch = opts.watch || false,
    throwOnUndefined = opts.throwOnUndefined || false,
    /*  变量env就表示Nunjucks模板引擎对象, 它有一个render(view, model)方法, 正好传入view和model两个参数, 并返回字符串 */
    env = new nunjucks.Environment(
      new nunjucks.FileSystemLoader('views', {
        noCache: noCache,
        watch: watch
      }), {
        autoescape: autoescape,
        throwOnUndefined: throwOnUndefined
      })
  // 如果在opts中存在自定义的filters, 为env加入这个自定义的过滤器(可以有多条自定义规则)
  if (opts.filters) {
    for (let f in opts.filters) {
      env.addFilter(f, opts.filters[f])
    }
  }
  return env
}

// 在options中自定义过滤器
let env = createEnv('views', {
  watch: true,
  filters: {
    // 名为hex的过滤器, 将n返回16进制的字符串
    hex: function(n) {
      if (n) {
        return '0x' + n.toString(16)
      } else {
        return n
      }
    }
  }
})
let s1 = env.render('./hello.http', { name: '小明' })
console.log(s1)
/* 得到结果: <h1>Hello 小明</h1> */
let s = env.render('./hello.http', { name: '<script>alert("小明")</script>' })
console.log(s)
/* 得到结果: <h1>hello &lt;script&gt;alert(&quot;小明&quot;)&lt;/script&gt;</h1>
* 这样就避免了输出恶意脚本
* */
let s2 = env.render('./hello.http', {
  name: '<Nunjucks>',
  fruits: ['Apple', 'Pear', 'Banana'],
  count: 12000
})
console.log(s2)
/* 此外, 可以使用Nunjucks提供的功能强大的tag, 编写条件判断, 循环等功能, 例如 */
// 循环输出名字
/*
<body>
  <h3>Fruits List</h3>
  {% for f in fruits %}
  <p>{{ f }}</p>
  {% endfor %}
</body>
*/
/* Nunjucks模板引擎最强大的动能在于模版的继承, 仔细观察各种网站可以发现, 网站的结构实际上是类似的, 头部, 尾部都是固定格式, 只有中间页面部分内容不同,
* 如果每个模板都重复头尾, 一旦要修改头部或者尾部, 那就需要改动所有的模板,
*  更好的方式是继承, 先定义一个网页的基本框架base.http
*  */
/*
<http><body>
{% block header %} <h3>Unnamed</h3> {% endblock %}
{% block body %} <div>No body</div> {% endblock %}
{% block footer %} <div>copyright</div> {% endblock %}
</body></http>*/
/* base.http 定义了三个可编辑的块, 分别命名为header,body和footer, 字模板可以有选择地对块进行重新定义: */
/*
{% extends 'base.http' %}
{% block header %}<h1>{{ header }}</h1>{% endblock %}
{%% blobk body }<p>{{ body }}</p>{% endblock %}
*/
/* 然后对子模板进行渲染 */
console.log(env.render('extend.http', {
  header: 'Hello',
  body: 'bla bla bla...'
}))
/* 得到结果中footer没有重定义, 依然使用父模板的内容 */

/* 性能 */
/*
*   对于模板渲染本身来说是非常快的, 就是拼字符串, 纯cpu操作
*   性能问题主要出现在从文件读取模板内容这一步, 这是一个IO操作, 而Nunjucks默认使用同步IO读取模板文件
* 好消息是Nunjucks会缓存已经读取的内容, 模板文件最多读取一次就会放在内存中, 后续的请求不会再次读取文件, 只要指定了noCache: false这个参数
*   在开发环境下可以关闭cache, 这样每次重新加载模版便于实时修改模板, 但是生产环境下一定要打开缓存以避免性能问题
*   Nunjucks也提供了异步读取的方式, 但是写起来很麻烦
* */
