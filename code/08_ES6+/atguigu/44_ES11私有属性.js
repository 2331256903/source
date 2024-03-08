// 私有属性 不能被被人访问
class Person{
  // 公有属性
  name;
  // 私有属性
  #age;
  #weight;
  // 构造方法
  constructor(name, age, weight) {
    this.name = name;
    this.#age = age;
    this.#weight = weight;
  }
  intro() {
    console.log(this.#age)
    console.log(this.#weight)
  }
}

const girl = new Person('小红', 18, '45kg')
console.log(girl)
girl.intro()