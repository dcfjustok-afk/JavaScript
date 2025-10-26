// bind 方法 会返回一个新函数
// 新函数被调用时，确保this和参数传递正确
// 需要特殊处理new关键字调用新函数的场景


Function.prototype.mybind=function(thisArg , ...args){
   const self= this;
   return function(...newArgs){
    self.call(thisArg,...args,...newArgs)
   }
}


function greet(a, b) {
  console.log(this.name, a, b);
}

const person = { name: 'Carol' };

const fn = greet.mybind(person, 'Hi');
fn('there'); // 输出：Carol Hi there

//下面是 当 新函数被new关键字调用时的场景
// 新函数的this应该指向新创建的实例对象
// 新函数的参数应该合并到实例对象的属性中

Function.prototype.mybind1=function(thisArg , ...args){
   const self= this;
   function boundFn(...newArgs){
    let resultThis = this instanceof boundFn ? this : thisArg
    return self.call(resultThis,...args,...newArgs)
   }
   boundFn.prototype =Object.create(self.prototype);
   return boundFn;
}
const obj = {}
const bound = greet.mybind1(obj, 'Hello');
new bound('World'); // 输出：Hello World undefined