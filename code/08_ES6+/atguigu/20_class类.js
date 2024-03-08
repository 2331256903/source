//   ES6提供了更接近传统语言的写法, 引入了class类这个概念, 作为对象的模板, 通过class关键字可以定义类, 基本上ES6的class可以看做只是一个语法糖,
// 绝大多数功能都可以用ES5实现, 只是让对象原型的写法更加清晰, 更像面向对象编程的语法而已

/* 传统方法
function Phone(brand, price) {
  this.brand = brand
  this.price = price
}

// 为了确保方法的复用, 将方法添加到对象构造函数的原型对象上
Phone.prototype.call = function() {
  console.log('打电话')
}

// 实例化对象
let Huawei = new Phone('华为', 5999)
Huawei.call()
console.log(Huawei)*/

// class
class Phone{
  // 构造方法, 名字不能修改
  constructor(brand, price) {
    this.brand = brand
    this.price = price
  }
  
  // 方法使用该语法, 不能使用 ES5 的对象完整形式
  call() {
    console.log("我可以打电话!!")
  }
}
let onePlus = new Phone("1+", 1999)
console.log(onePlus)
 