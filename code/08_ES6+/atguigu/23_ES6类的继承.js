class Phone{
  // 构造方法
  constructor(brand, price) {
    this.price = price
    this.brand = brand
  }
  // 父类的成员属性
  call() {
    console.log("打电话")
  }
}

class SmartPhone extends Phone{
  // 构造方法
  constructor(brand, price, color, size) {
    // 子类调用父类的构造方法
    super(brand, price) // 此处的 super 就是父类的 constructor 方法, 通过这种方式完成调用
    this.color = color
    this.size = size
  }
  photo() {
    console.log('拍照')
  }
}

const xiaomi = new SmartPhone('xiaomi', 799, '黑色', '4.7inch')
console.log(xiaomi)