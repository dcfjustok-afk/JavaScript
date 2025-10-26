function Person(name, age) {
    this.name = name
    this.age = age
}
console.log(Person.prototype);

Person.prototype.sayName = function () {
    console.log(this.name)
}
Person.prototype.sayAge = function () {
    console.log(this.age)
}
const p1 = new Person('张三', 18)
// p1.sayName()
console.log(p1.__proto__)
console.log(Person.prototype)  //  这里就是 Constructor.prototype


console.log(Object.getPrototypeOf(p1)===Person.prototype);

