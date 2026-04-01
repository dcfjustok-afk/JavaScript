// 1. 构造函数和原型的基本概念
console.log('=== 1. 构造函数和原型 ===');
function Dog(name) {
    this.name = name; // 实例属性
    this.bark = function() {
        console.log(`${this.name} 汪汪叫`);
    };
}

// 原型方法 - 所有实例共享
Dog.prototype.eat = function() {
    console.log(`${this.name} 吃东西`);
};

// 创建实例
let wangcai = new Dog('旺财');
let ahua = new Dog('阿花');

console.log(wangcai.__proto__===Dog.prototype);
console.log(Dog.prototype);


console.log(wangcai.name); // 访问实例属性
wangcai.bark(); // 访问实例方法
wangcai.eat(); // 访问原型方法

console.log(ahua.name);
ahua.bark();
ahua.eat();

// 检查原型
console.log('\n=== 2. 原型链 ===');
console.log(Dog.__proto__);

console.log('wangcai.__proto__ === Dog.prototype:', wangcai.__proto__ === Dog.prototype);
console.log('Dog.prototype.__proto__ === Object.prototype:', Dog.prototype.__proto__ === Object.prototype);
console.log('Object.prototype.__proto__:', Object.prototype.__proto__); // null

// 3. 继承的实现（原型链继承）
console.log('\n=== 3. 原型链继承 ===');
function Animal(type) {
    this.type = type;
}

Animal.prototype.move = function() {
    console.log(`${this.name} 在移动`);
};

// 让Dog继承Animal
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog; // 修复构造函数指向

// 测试继承
let xiaobai = new Dog('小白');
console.log(xiaobai.type); // 继承自Animal的属性？
// 注意：这里type是undefined，因为我们没有在Dog构造函数中调用Animal构造函数

// 4. 更完整的继承（组合继承）
console.log('\n=== 4. 组合继承 ===');
function Cat(name) {
    Animal.call(this, '猫'); // 调用父构造函数
    this.name = name;
}

Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Cat;

// 添加Cat特有的方法
Cat.prototype.meow = function() {
    console.log(`${this.name} 喵喵叫`);
};

let tom = new Cat('汤姆');
console.log(tom.type); // 猫
console.log(tom.name); // 汤姆
tom.move(); // 继承自Animal的方法
tom.meow(); // Cat特有的方法

// 5. ES6 class语法
console.log('\n=== 5. ES6 class语法 ===');
class Bird extends Animal {
    constructor(name) {
        super('鸟'); // 调用父类构造函数
        this.name = name;
    }
    
    fly() {
        console.log(`${this.name} 在飞翔`);
    }
}

let tweety = new Bird('翠迪');
console.log(tweety.type); // 鸟
console.log(tweety.name); // 翠迪
tweety.move(); // 继承自Animal的方法
tweety.fly(); // Bird特有的方法

// 6. 详细解释 prototype 和 __proto__
console.log('\n=== 6. prototype 和 __proto__ 详细解释 ===');

// 定义 Person 构造函数和实例
function Person(name) {
    this.name = name;
}

// 在原型上添加方法
Person.prototype.sayHello = function() {
    console.log(`Hello, I'm ${this.name}`);
};

// 创建实例
let alice = new Person('Alice');
// 实例可以访问原型上的方法
alice.sayHello();

// 6.1 prototype 是构造函数的属性
console.log('\n6.1 构造函数的 prototype 属性:');
console.log('Person.prototype:', Person.prototype);
console.log('typeof Person.prototype:', typeof Person.prototype);

// 6.2 __proto__ 是实例的属性
console.log('\n6.2 实例的 __proto__ 属性:');
console.log('alice.__proto__:', alice.__proto__);

// 6.3 实例的 __proto__ 指向构造函数的 prototype
console.log('\n6.3 实例与构造函数原型的关系:');
console.log('alice.__proto__ === Person.prototype:', alice.__proto__ === Person.prototype);

// 6.4 构造函数也是对象，有自己的 __proto__
console.log('\n6.4 构造函数的 __proto__:');
console.log('Person.__proto__:', Person.__proto__);
console.log('Person.__proto__ === Function.prototype:', Person.__proto__ === Function.prototype);

// 6.5 prototype 对象也有 __proto__
console.log('\n6.5 原型对象的 __proto__:');
console.log('Person.prototype.__proto__:', Person.prototype.__proto__);
console.log('Person.prototype.__proto__ === Object.prototype:', Person.prototype.__proto__ === Object.prototype);

// 6.6 Object.prototype 的 __proto__ 是 null
console.log('\n6.6 Object.prototype 的 __proto__:');
console.log('Object.prototype.__proto__:', Object.prototype.__proto__);

// 6.7 Function.prototype 的 __proto__ 指向 Object.prototype
console.log('\n6.7 Function.prototype 的 __proto__:');
console.log('Function.prototype.__proto__:', Function.prototype.__proto__);
console.log('Function.prototype.__proto__ === Object.prototype:', Function.prototype.__proto__ === Object.prototype);

// 6.8 constructor 属性
console.log('\n6.8 constructor 属性:');
console.log('alice.constructor:', alice.constructor);
console.log('alice.constructor === Person:', alice.constructor === Person);
console.log('Person.prototype.constructor:', Person.prototype.constructor);
console.log('Person.prototype.constructor === Person:', Person.prototype.constructor === Person);

// 6.9 原型链查找机制
console.log('\n6.9 原型链查找机制:');
// 检查实例是否有该方法
console.log('alice.hasOwnProperty("sayHello"):', alice.hasOwnProperty('sayHello'));

// 6.10 总结
console.log('\n6.10 总结:');
console.log('1. 每个函数都有一个 prototype 属性');
console.log('2. 每个实例都有一个 __proto__ 属性');
console.log('3. 实例的 __proto__ 指向其构造函数的 prototype');
console.log('4. 构造函数的 prototype 是一个对象，也有自己的 __proto__');
console.log('5. 这些 __proto__ 链接形成了原型链');
console.log('6. 当访问一个属性时，会沿着原型链向上查找');
console.log('7. ES6 class 语法是原型继承的语法糖');
