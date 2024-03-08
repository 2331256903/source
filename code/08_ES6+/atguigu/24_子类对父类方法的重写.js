class Phone{
  constructor(brand, price) {
    this.price = price
    this.brand = brand
  }
  call() {
    console.log("打电话")
  }
}

class SmartPhone extends Phone{
  constructor(brand, price, color, size) {
    super(brand, price)
    this.color = color
    this.size = size
  }
  photo() {
    console.log('拍照')
  }
  // 子类重新声明同名方法, 即可对父类方法进行重写
  call() {
    // 但是js中, 子类不能调用父类重名方法
    // super()  这里会报错
    console.log('使用小米手机通话')
  }
}

const xiaomi = new SmartPhone('xiaomi', 799, '黑色', '4.7inch')
console.log(xiaomi)
xiaomi.call()