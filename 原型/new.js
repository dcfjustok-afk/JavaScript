// 下面手写一个 new 运算符的模拟实现
// 首先要知道 new 运算符的作用
// 1、创建一个新对象
// 2、将构造函数的 this 指向新对象
// 3、执行构造函数的代码
// 4、返回新对象
function myNew(constuctor,...args){
    let obj ={}
    Object.setPrototypeOf(obj,constuctor.prototype);
    let result = constuctor.apply(obj,args)
    return result instanceof Object ? result : obj;
}
// 测试
function Person(name) {
  this.name = name;
}
Person.prototype.sayHi = function() {
  console.log(`Hi, I am ${this.name}`);
};

const p = myNew(Person, 'Alice');
p.sayHi(); // Hi, I am Alice

const p2 = new Person('Bob');
p2.sayHi(); // Hi, I am Bob