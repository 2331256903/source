// ES5
/*
function Phone(brand, price){
  this.brand = brand
  this.price = price
}


// 函数对象里的属性与在函数对象上, 与实例对象无关, 这样的属性称之为静态成员  在面向对象语言中, 这个对象属于类而不是实例对象
Phone.name = '手机'
Phone.change = function () {
  console.log('改变')
}

let nokia = new Phone()
console.log(nokia.name) // undefined  实例对象没有构造函数对象上的方法
// 而是与构造函数的原型对象上的方法相同
Phone.prototype.size = '5.5inch'
console.log(nokia.size)*/

class Phone{
  // 静态属性
  static name = '手机'
  static change() {
    console.log('改变')
  }
}

let nokia = new Phone()
console.log(nokia.name)
