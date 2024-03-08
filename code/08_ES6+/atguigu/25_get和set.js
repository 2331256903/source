// class 里的 get 和 set
// get 通常用于 对对象的一个动态属性进行封装, 使用函数动态计算结果
// set 通常用来对输入属性做校验
class Phone {
  // 对 price 属性的读取绑定了一个函数
  get price() {
    console.log("价格属性被读取了")
  }
  // 类的构造函数可以省略
  
  // 对属性赋值的时候会自动调用 set 函数, set 函数必须含参
  set price(newVal) {
    console.log('价格属性被修改了')
  }
}

// 实例化对象
let s = new Phone()
console.log(s.price) // 只要对设置了 get 的属性执行读取操作, 就会调用函数
s.price = 'free' // 触发 set 方法
