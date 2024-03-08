// 手机
function Phone(brand, price) {
  this.brand = brand
  this.price = price
}
Phone.prototype.callNum = function() {
  console.log('我可以打电话')
}

// 智能手机 (子集构造函数)
function SmartPhone(brand, price, color, size) {
  Phone.call(this, brand, price)
  /*
  * call函数的作用
  * 1. 立即让函数执行
  * 2. 改变this指向
  * 3. 可以实现继承问题
  *   此处立即调用3构造函数Phone并修改其中的this指向, 相当于执行了this.brand = brand; this.price = price
  * */
  this.color = color
  this.size = size
}

// 设置子级构造函数的原型
SmartPhone.prototype = new Phone()
SmartPhone.prototype.constructor = SmartPhone // 校正

// 声明子类的方法
SmartPhone.prototype.photo = function() {
  console.log("我可以拍照")
}

const chuizi = new SmartPhone('锤子', 2499, '黑色', '5.5inch')
console.log(chuizi)