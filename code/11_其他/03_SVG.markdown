## `SVG`

###  1.`svg`是`XML`语法的图像格式, 即可缩放的矢量图

### 2. 位图和矢量图

1. 位图: 传统的`jpg/png/gif`都是位图, 大量像素点组成的图片, 色彩逼真但放大后失真且体积大
  2. 矢量图: 用XML格式定义, 通过各种`路径`和`填充颜色`来描述渲染的图片, 最明显的特征, 颜色边缘和线条边缘非常顺滑, 无论放大或缩小颜色的边缘也非常顺滑, 并且非常清楚; 放大后不会失真, 体积小, 且`SVG`图像中的文本是可写的, 同时也是可以搜索的(适合制作地图)

### 3. `SVG`的应用

1. 双标签, 基本用法:

   `<svg>...</svg>`

   其中会包含很多子标签, 用于回执各种图形

   `svg`相当于一个画布, 有width和height用于定义画布的宽高, `xmlns`属性指定`SVG`文档的`XML`命名空间

   ``````HTML
   <svg
   	width="200" 指定SVG画布的宽度
   
   	height="200" 指定SVG画布的高度
   
   	xmlns="http://www.w3.org/2000/svg">
   
   	<!-- SVG图形内容 -->
   
   </svg>
   ``````

   `xmlns`和`xmlns:xlink`

   `SVG`使用`XML`格式定义图形, `SVG`是纯粹的`XML`文件, 在`XML`中, 标签和属性属于命名空间, 这是为了防止来自不同技术的标签和属性发生冲突, 例如在`SVG`中存在a标签, 在`HTML`中也存在a标签, 为了区分这个a标签是属于哪种技术, 需要使用到命名空间了; `xmlns`用于声明命名空间(`namespace`), 在此声明之下的所有子标签都属于这个空间内, 这里看起来是一个`url`, 但实际上仅仅是一个字符串, 这样使用只是惯例, `xmlns:xlink`表示前缀为`xlink`的标签和属性

2. 注意:

   1. 和canvas一样, `svg`也有默认的宽高, 并且默认的宽高和canvas一样, 默认宽度为`300px`, 高度为`150px`; 不同之处在于`svg`可以通过`css`设置宽高, 也可以通过行内的属性来设置宽高
   2. `svg`默认有填充且为黑色
   3. `svg`所有图形绘制, 坐标起点都在画布的左上角, 从起点开始, 向右看作x轴, 向下看作y轴(屏幕坐标系)

3. 基本绘制图形, `SVG`提供了一系列的图形元素来绘制各种形状的图形, 如矩形, 圆形, 直线, 多边形等

   1. 矩形: 用`rect`单标签, 指定矩形的位置, 大小, 圆角等属性

      ```javascript
      <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
        <rect x="50" y="50" width="100" height="80" fill="blue" stroke="black" stroke-width="2" 
      fill="blue" />
      </svg>
      ```

      <rect /> 属性:

      > x/y: 指定绘制的位置
      >
      > width: 定义矩形宽度
      >
      > height: 定义矩形高度
      >
      > fill: 定义矩形填充颜色
      >
      > fill-opacity: 矩形填充颜色的不透明度(0-1, 值越小透明度越高)
      >
      > stroke-width: 定义矩形的边框宽度
      >
      > stroke: 定义矩形边框的颜色(颜色名称/`rgb`色值/十六进制颜色值等)
      >
      > stroke-opacity: 定义矩形边框不透明度(0-1, 值越小透明度越高)
      >
      > opacity: 用来设置整个元素的不透明值(0-1, 值越小透明度越高)	

   2. 绘制圆角矩形

      <rect rx="" ry="">

      1. `rx/ry`设置圆角矩形半径, `ry`定义圆角y轴方向的半径长度, `rx`定义圆角x轴方向的半径长度	

   3. 绘制圆形 可指定圆心坐标和半径

      <circle cx="100" cy="100" rx="80" ry="50" fill="green"/> 

      1. `cx="" cy="": 圆绘制的圆心位置, 省略则默认(0, 0) r=""`: 半径

   4. 绘制椭圆 可指定椭圆的中心坐标和长短轴的半径

      <ellipse cx="100" cy="100" rx="80" ty="50" fill="green"/> 

      1. `cx="" cy="" rx="" ry=""`椭圆中心的x,y坐标, `rx, ry`定义水平垂直半径

         注意: `svg`的元素覆盖由书写顺序决定, 写在靠后位置的图会盖在靠前的图上方

   5. 绘制线条 需要指定起点和终点坐标

      <line x1="50" y1="50" x2="150" y2="150" stroke="black" stroke-width="2" /> 

      1. `x1="" y1="" x2="" y2=""` `x1/y1`起点坐标, `x2/y2`终点坐标

   6. 绘制多边形 需要指定多个顶点的坐标

      <polygon /> 用于创建一个至少包含三条边的图形

      1. point属性, 用于设置多个点, 定义多边形的每个角的x, y坐标(至少3对, 每一对坐标用x,y用逗号隔开, 坐标之间用空格隔开)

      <polygon points="100,10 40,198 190,78 10,78 160,198" fill="orange" /> 画一个五角星

      注: `SVG`的图形填充规则通过fill-rule属性来指定

      fill-rule: 有效值: `nonzero|evenodd|inherit`, 应用于shape形状类元素和文字内容类元素

      fill-rule属性用于指定使用哪一种算法去判断画布上的某区域是否属于该图形内部(内部区域将被填充),

      nonzero 非零: 按该规则, 要判断一个点是否在图形内, 从该点做任意方向的一条射线, 然后检测射线和图形路径的交点情况, 从零开始算, 路径从左向右穿过射线则计数加一, 从右向左穿过射线则计数减一, 得出计算结果后结果为0, 则认为点在图形外面, 否则为内部

      `evenodd`奇偶: 按该规则, 要判断一个点是否在图形内, 从该点作任意方向键的一条射线, 然后检测射线与路径的交点数量, 如果结果是奇数则认为点在内部, 否则在外部

   7. 折线: 需要指定多个顶点的坐标

      <polyline point="100, 50, 150, 150, 50, 150" fill="none" stroke="blue" stroke-width="2" />

   8. 路径: 可以通过指定一系列的路径命名来绘制各种形状 `SVG`中最强大和最灵活的基本形状之一

      <path d="M10 10 L90 10 L50 90 Z" fill="none" stroke="black" stroke-width="2" />

      使用<path>元素可以绘制直线,曲线,弧线等各种复杂的图形, 并可以通过设置路径和命名来控制路径的形状和样式

      d属性定义了路径的路径数量, 即路径命令序列, 路径数据由一系列的路径命名组成, 每个路径命令以字母开头, 后面跟随一组数字参数, 常用的路径命令包括:

      > M/m (x,y)+  移动到当前位置
      >
      > L/l (x,y)+ 直线到
      >
      > H/h (x)+ 水平线到
      >
      > V/v (x)+ 垂直线到
      >
      > C/c (`x1,y1,x2,y2,x,y`)+ 三次贝塞尔曲线
      >
      > S/s (`x1,y1,x,y`)+ 光滑曲线
      >
      > Q/q (`x1,y1,x,y`)+ 二次贝塞尔曲线
      >
      > T/t (x,y)+ 光滑二次贝塞尔曲线
      >
      > A/a (`rx,ry,xr,laf,sf,x,y`) 弧线
      >
      > Z/z 闭合路径
      >
      > 等等

      上述每个指令都有大小写, 所有path从起点(0,0)开始, 大写字母表示其后方坐标为绝对坐标, 而小写字母后表示为相对坐标, 即移动了多少单位

      1. 绝对坐标移动实例:

         <path d="M30, 30 V6" stroke="#000002"/>

         `M30, 30`表示将起点移动到(30, 30)上, `V60`表示横坐标不变, 纵坐标移动到绝对位置60处

      2. 曲线路径:

         包含:二次贝塞尔曲线: 指令符为Q/q, 以及光滑形式的T/t

         ​	三次贝塞尔曲线: 指令符为C/c, 以及光滑形式的S/s

         ​	弧形曲线: 指令符为A/a

         贝塞尔曲线由起点终点和中间的控制点组成, 其中起点和控制点的直线/终点和控制点的直线都和该贝塞尔曲线相切, 因此有两个控制点的三次贝塞尔曲线比一个控制点的二次贝塞尔曲线更平缓

         (1). 二次贝塞尔曲线 Q/q

         ​	<path d="M30, 20 Q70, 10 80, 40"/>

         ​	每段二次贝塞尔曲线由两个坐标构成, 分别代表控制点和结束点

         (2). 三次贝塞尔曲线 C/c

         ​	<path d="M30, 20 C50,10 80, 20 80, 40"/>

         ​	每段三次贝塞尔曲线由三个坐标构成. 分别代表控制点1, 控制点2和结束点

         (3). 弧形曲线 A/a 

         ​	每段弧形曲线有7个参数组成, 本质上是由椭圆上截取弧线, 

         ​	前两个值是椭圆的两个半轴长度, 第三个值是旋转角度(旋转不以椭圆圆心旋转, 而是y轴的倾斜角度, 同时要满足椭圆过起止点), 第四个值是表示取较大的圆弧还是较小的那段圆弧, 第五个值代表是否顺时针, 第六第七个值代表结束坐标

         ​	![alt 弧形曲线](https://ask.qcloudimg.com/http-save/yehe-2608304/34318972a3345cd0c89e086780a646b3.png)

         ​	![alt 弧形曲旋转角度](https://ask.qcloudimg.com/http-save/yehe-2608304/b8282e13b88a4be1bba7f947d427c771.png)

         (4): 光滑形三次贝塞尔曲线

         ​	每段S指令后是两个坐标, 但它是一个三次贝塞尔曲线,  和C的关系相当于C的控制点1和起点重合, 如下的两个弧形是同一条曲线:

         ![alt 光滑三次贝塞尔曲线](https://ask.qcloudimg.com/http-save/yehe-2608304/c12e12ca3d6cb35775665f89578ac666.png)

         ​	<path d="M20, 10 C20, 10 40, 70 80, 50"/>

         ​	<path d="M20, 10 40, 70 80, 50"/>

         另外, 最难把握的一点是: 若S的上一段曲线是三次贝塞尔曲线, S的第一个控制点需要是上个三次贝	塞尔曲线[第二控制点]关于S起点的对称点, 否则S的第一个控制点是S起点

         ​	![alt 上一段为三次贝塞尔曲线的光滑三次贝塞尔曲线](https://ask.qcloudimg.com/http-save/yehe-2608304/6856c184473294c9d14dcb829abd1f9f.png)

         ​	如图所示: 理解S就是理解下面的`Sp1`点是什么

         ​	<path d="M10, 40 C20, 10 40, 10 50, 40 S90, 70 90, 20"/>

         (5): 光滑形二次贝塞尔曲线 T/t

         T/t 指令也类似:

         ​	若T的上一段曲线是二次贝塞尔曲线, T的控制点是上个二次贝塞尔曲线[控制点]关于[S起点]的对称点

         ​	否则T的控制点为T起点

         ​	![alt 上一段为二次贝塞尔曲线的光滑二次贝塞尔曲线](https://ask.qcloudimg.com/http-save/yehe-2608304/a357156272b296a75732d37d7d29d76d.png)

         ​	<path d="M10, 40 Q30, 60 50, 40 T90, 40"/>

   9. 渐变和填充: 
      1. 使用<linearGrandient>或<radialGradient>定义渐变
      2. 使用 fill 和 stroke 属性指定填充和描边样式

   10. 动画和交互
       1. 使用`css`和`js`创建动画效果
       2. 添加事件处理器实现交互功能, 如鼠标悬停, 点击等

4. 嵌套和分组

   1. `SVG`元素可以嵌套和分组, 以便更好地组织和管理图形元素

      <g id="group1"> 

      ​	<rect x="10" y="10" width="50" heigth="50" />

      ​	<circle cx="100" cy="100" r="30" />

      </g>

      `<g>`用于创建一个分组

      id属性用于为分组指定一个唯一的标识符

### 4. `SVG`在`HTML`页面

​	1. 使用<img>标签可以将`SVG`图像作为图片嵌入到`HTML`页面中, 可以使用`src`属性指定`SVG`文件的路径, 也可以设置width和height属性来指定图片的宽度和高度

​	`<img src="example.svg" alt="SVG Image" width="200" height="200">`

​	2. 使用<object>标签用于将外部资源嵌入到`HTMl`页面中, 可以使用data属性指定`SVG`文件的路径, type属性指定资源的MIME类型

​	支持`SVG`的浏览器会直接显示`SVG`图像, 不支持的浏览器会显示替代内容

```html
<object data="example.svg" type="image/svg+xml" width="200" height="200">
    Your browser does not support SVG
</object>
```

​	3. 使用<iframe>标签, 用于在`HTML`页面中嵌入另一个HTML文档, 可以使用`src`属性指定`SVG`文件的路径, 并设置width和height属性来指定`iframe`的宽度和高度

​	`<iframe src="example.svg" width="200" height="200"></iframe>`

​	4. 直接在`HTML`中嵌入`SVG`代码, `SVG`代码直接放置在<body>标签中或其他合适位置, 这种方式使得`SVG`图像和`HTML`内容混合在一起, 可以直接在`HTML`页面中编辑和调整`SVG`图像

​	5. 使用<a>标签链接到一个`SVG`文件

​	`<a href="circle.svg">查看SVG文件</a>`

### 5. `SVG`文本

	1. `SVG`中的<text>元素用于在`SVG`图像中添加文本内容, 它允许你在指定的位置显示文本, 并可以通过设置属性来控制文本的样式, 字体, 大小等

    ```html
    <text
    	x="x-coordinate" 文本左上角的x坐标
    	y="y=coordinate" 文本左上角的y坐标
    	font-family="font" 字体名称
    	font-size="size" 字体大小
    	fill="fill-color" 文本颜色
    	text-anchor="anchor" 文本锚点
    >
    	Text content 文本内容
    </text>
    ```

    例1: 旋转的文字: rotate(<a> [<x>, <y>]) 指围绕给定点(x, y)旋转a度, 不指定则围绕原点旋转

    ```html
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <text x="0" y="15" fill="red" transform="rotate(30 20, 40)">I love svg</text>
    </svg>
    ```

    例2: 路径(圆弧)上的文字

    ``````html
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink">
        <defs>
        	<path id="path1" d="M75, 20 a1, 1 0 0, 0 100, 0" />
        </defs>
        <text x="10" y="100" style="fill:red">
            <textPath xlink:href="#path1">I love SVG I love SVG</textPath>
        </text>
    </svg>
    ``````

    ​	`xlink:href`用于指定一个外部资源的URL, 这个资源可以是另一个`SVG`文件, 图像, 脚本或者其他可以通过URL访问的资源, `xlink`是XML linking Language的缩写, 它是XML中用于定义超链接和其他资源引用的标准

    ​	`xlink:href` 属性通常用在`SVG`元素上, 以便链接到其他资源, 例如可以用来嵌入一个外部的`SVG`的图形, 或者在`SVG`内部创建一个指向其他网页或资源的链接

    ​	可以链接到:

     1. 另一个`SVG`文件

     2. 图像文件(`PNG`, `JPEG`)

     3. `HTML`页面

     4. 脚本文件

     5. 其他可以通过`URL`访问的资源

        应用场景:

    1. 图标库: 使用`xlink:href`可以创建一个可重用的图标库, 通过链接到外部`SVG`文件来显示不同的图标
    2. 动画: 链接到包含动画的`SVG`文件中, 可以在主`SVG`文件中嵌入动画效果
    3. 交互式图标: 在数据可视化中, 可以使用`xlink:href`来连接到数据源或者交互式脚本

    例3: 元素可以安排任何分小组与<tspan>元素的数量, 每个<tspan>元素可以包含不同的格式和位置, 几行文本(与<tspan>元素)

    ``````html
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
    	<text x="10" y="20" style="fill:red">Several lines:
        	<tspan x="10" y="45">First line</tspan>
            <tspan x="10" y="70">Second line</tspan>
        </text>
    </svg>
    ``````

### 6. 渐变

1. 线性

   ​	`SVG`中的<linearGradient>元素用于创建线性渐变, 它可以沿着一条直线从一个颜色过渡到另一个颜色, 从而创建平滑的渐变效果, 用于填充或描边`SVG`元素, 使其呈现出丰富的颜色变化

   ``````html
   <linearGradient id="gradient_id" x1="x1" y1="y1" x2="x2" y2="y2">
   	<stop offset="0%" stop-color="red" />
   	<stop offset="100%" stop-color="blue" />
       	更多的<stop>元素...
   </linearGradient>
   ``````

   1. id属性定义了线性渐变的唯一标识符, 用于在`SVG`图像中引用该渐变
   2. `x1`和`y1`属性定义了渐变的起始点坐标
   3. `x2`和`y2`属性定义了渐变的结束点坐标
   4. <stop>元素用于指定渐变中的颜色和颜色的位置

   因此当`y1`和`y2`相等,  `x1`和`x2`不同时, 创建为水平渐变; 反之则创建垂直渐变, 四个值均不同创建角形渐变

   注: 渐变的坐标值可以使用百分比或具体的长度值, 百分比值相对于图形元素大小

2. 放射性

   ​	`SVG`中的<radialGradient>元素用于创建径向渐变, 它可以从一个中心点向外扩散形成渐变效果, 使图形呈现出环形, 放射状等丰富的颜色变化, 径向渐变可以应用于填充或描边`SVG`图形元素, 为其添加立体感和视觉效果

   ``````html
   <radialGradient id="gradient_id" cx="cx" cy="cy" r="r" fx="fx" fy="fy">
       <stop offset="0%" stop-color="red" />
       <stop offset="100%" stop-color="blue" />
       	更多的<stop>元素...
   </radialGradient>
   ``````

   1. id属性定义了径向渐变的唯一标识符, 用于在`SVG`图像中引用该渐变
   2. `cx`和`cy`属性定义了渐变的中心点坐标
   3. r属性定义了渐变的半径
   4. `fx`和`fy`属性定义了渐变焦点的坐标(可选), 用于控制渐变的形状和方向
   5. <stop>元素用于指定渐变中的颜色和颜色的位置

### 7. stroke属性

​	`SVG`中的stroke属性用于定义图形元素的描边颜色, 它可以运用于任何具有轮廓的图形元素, 如<rect> <circle> <path>等

​	基本语法: <element stroke="color" />

​	stroke 属性定义了图形的描边颜色, 可以使用颜色名称, 十六进制颜色值, `RGB`值, `RGBA`值等来表示颜色

​	如果不想显示描边则stroke属性设置为"none"

​	`SVG`提供了一个范围广泛stroke属性:

​		`stroke`

​		`stroke-width`

​		`stroke-linecap`

​		`stroke-dasharray`

​	所有的stroke属性, 可以应用于任何种类的线条, 文字和元素, 就像一个圆的轮廓

 1. stroke绘制一条线, 文本或元素轮廓颜色:

    ``````html
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
    	<g fill="none">
            <path stroke="red" d="M5 20 1215 0" />
            <path stroke="blue" d="M5 20 1215 0" />
            <path stroke="black" d="M5 20 1215 0" />
        </g>
    </svg>
    ``````

2. stroke-width属性, 定义一条线, 文本 或元素轮廓厚度

3. `stroke-linecap`属性, 定义不同类型的开放路径的终结:

   ``````html
   <svg xmlns="http://www.w3.org/2000/svg" version="1.1" >
   	<g fill="none" stroke="black" stroke-width="6">
           <path stroke-linecap="butt" d="M5 20 1215 0" />
           <path stroke-linecap="round" d="M5 20 1215 0" />
           <path stroke-linecap="square" d="M5 20 1215 0" />
       </g>
   </svg>
   ``````

   4. `stroke-dasharray`属性 用于创建虚线:

      ``````html
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
      	<g fill="none" stroke="black" stroke-width="4">
      		<path stroke-dasharray="5, 5" d="M5 20 1215 0" />
      		<path stroke-dasharray="20, 10, 5, 5, 5, 10" d="M5 60 1215 0" />
          </g>
      </svg>
      ``````

      (1).`stroke-dasharray`的值是数组

      `stroke-dasharray`: '10' 该值为一个时, 表示虚线长10, 间距5, 然后重复

      `stroke-dasharray`: '10, 5' 该值为两个, 表示虚线长10, 间距5, 然后重复

      `stroke-dasharray`: '20, 10, 5' 该值为三个时, 表示虚线长20, 间距10, 虚线长5, 接着间距20, 虚线10, 间距5, 以此循环

   5. `stroke-dashoffset` 这个属性是相对于起始点的偏移, 整数偏移x值时相当于向左移动了x个单位, 负数偏移x的时候相当于向右移动x长度单位; 但需要注意的是无论偏移的方向是哪边, 要记得`dasharray`是循环的, 也就是 虚线-间隔-虚线-间隔

      且该属性要搭配`stroke-dashoffset`才能看得出来效果, 非虚线无法看出偏移

      配合`stroke-dasharray`属性, `css`的 transition 可以实现动画效果, 比如圆形进度条等

   ​	

