<!--  -->   定义注释
<!DOCTYPE>  定义文档类型  是一个文档类型标记, 是一种标准通用标记语言的文档类型声明, 在 web 设计中 用来告知浏览器使用的 HTML 或 XHTML 是什么版本 eg: <!DOCTYPE html>
<a></a>     定义超文本链接, 从一个页面链接到另一个页面
				href属性 用于创建指向另一个文档的链接  只有设置了 href 属性, 才能使用 hrefflag、media、rel、tagget、type属性
				download属性 指定下载链接
				target属性 
						_blank 在新窗口打开被链接文档; 
						_self(默认) 在相同的框架中打开被链接文档; _parent 在父框架级中打开被连接文章
						_parent 在父框架集(<iframe> 观感有点类似 vue 的单页面,在同一个浏览器窗口中显示不止一个页面)中打开被链接的文档, 在窗口与顶级框架中等同于 _self
						_top 在当前窗体打开链接, 并替换当前的整个窗体(框架页), 清除所有包含的框架
						framename 在指定框架中打开被连接文档
<audio></audio> HTML5 提供的用来播放音频文件的标签
<base> 基准网址标记  为页面上的所有相对链接的基准URL
		注:  一个文档中最多使用一个 base 标签, base 标签在 <head></head> 标签中的第一个位置 且 必须具备 href 属性或 target 属性之一 或两者兼备
<body></body> 定义文档的主体
<br> 定义换行, 无需闭合标签
<button></button> 定义一个点击按钮
<canvas> 定义图形 该标签是一个画布标签, 本身只是一个图形容器, 需要使用脚本来绘制图形
			eg: <canvas id="myCanvas"></canvas>
				<script type="text/javascript">
					var canvas=document.getElementById('myCanvas');
					var ctx=canvas.getContext('2d');
					ctx.fillStyle='#FF0000';
					ctx.fillRect(0,0,80,100);
				</script>
<footer></footer> 用于网页的底部布局, 表示页脚, 包含与文档相关的信息
<form></form> 用于创建供用户输入的HTML表单, 并向服务器传输数据
				action属性 规定当提交表单时向何处发送表单数据
				accept-charset 规定服务器可处理的表单数据字符集
				enctype application/x-www-form-urlencoded || multipart/form-data || text/plain 适用于methods="post"的情况, 规定在向服务器发送表单数据之前如何对其进行编码
				method get || post 规定用于发送表单数据的HTTP的方法
				name 规定表单的名称
				target _blank || _self || _parent || _top 规定在何处打开action URL
<h1></h1> - <h6></h6> 定义HTML标题, 通常只用h1-h3
<head></head> 定义关于文档信息(元数据), 包含脚本、样式、meta信息以及其他更多的信息
				title标签 定义标题，头部中的必需元素
				style标签 定义样式
				base标签 为页面上所有相对链接规定默认url或默认目标
				link标签 常用于链接CSS样式表
				meta标签 提供页面元信息, 定义tdk, 有利于搜索引擎优化
				script标签 用于链接外部JavaScript文件的外部资源标签
				noscrpit标签 在不支持JavaScript的浏览器中显示替代内容, 可以包含任何HTML元素
<hr> 定义水平线
<html></html> 定义html文档
<img> 用于展示HTML中的图像
		必需属性: alt 规定图像的替代文本
				src 规定显示图像的url
				crossorigin 设置图像的跨域属性
<input> 在form元素中使用用于声明允许用户输入数据的控件
文本标签:
<b></b> 定义粗体文本
<em></em>(通常) 或 <strong></strong>(少用) 强调重要文本
<i></i> 定义斜体子


