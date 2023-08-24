/**
 * GET请求的情况:
 *  在地址栏直接输入url访问
 *  点击a链接
 *  link标签引入css
 *  script标签引入js
 *  video与audio引入多媒体
 *  img标签引入图片
 *  form标签中的method为get
 *  ajax中的get请求
 * POST请求的情况
 *  form标签中的method为post
 *  ajax的post请求
 * */

/**
 * GET和POST请求的区别
 *  GET和POST是HTTP协议请求的两种方式, 区别如下:
 *    1. 作用 GET主要用来获取数据, POST主要用来提交新增数据, 但这不是绝对的
 *    2. 参数位置, GET带参数请求是将参数缀到URL之后, POST带参数请求是将参数放到请求体中, 也不是绝对的
 *    3. 安全性 POST请求相对于GET请求更安全些, 因为GET请求的参数会暴露在浏览器的地址栏中
 *    4. GET请求大小有限制, 一般为2k, 而POST请求没有大小限制
 * */
