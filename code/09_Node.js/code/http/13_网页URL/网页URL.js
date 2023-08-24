/**
 * 网页中的URL: 相对路径和绝对路径
 * 绝对路径可靠性强, 项目中运用较多
 *   完整体: http://atguigu.com/web 协议域名端口号路径  直接向目标组员发送请求, 网站的外链会用到此形式
 *   省略协议: //atguigu.com/web  与页面的协议拼接, 形成完整的URL再发送请求, 大型网站用的多
 *   只保留路径: /web 与页面URL的协议,主机名,端口拼接形成完成URL再发送请求, 中小型网站
 * 相对路径: 在发送请求时需要与当前页面URL路径进行计算, 得到完整URL后, 在发送请求, 学习阶段用的比较多
 *   相对路径不可靠, 项目运行阶段用的比较少, 它与页面URL相关, 页面URL出现问题的时候, 相对路径也会出现问题
 *   形式: ./css/app.css         最终URL: http://www.atguigu.com/course/css/app.css
 *        js/app.js             最终URL: http://www.atguigu.com/course/js/app.js
 *        ../img/logo.png       最终URL: http://www.atguigu.com/img/logo.png
 *        ../../img/logo.png    最终URL: http://www.atguigu.com/img/logo.png  跑不出根目录
 * */

/**
 * 网页URL使用场景:
 *  a标签href
 *  link标签href
 *  script标签src
 *  img标签src
 *  video audio标签src
 *  iframe标签src
 *  form中的action
 *  AJAX请求中的URL
 * */
