var a = 1;

var obj = {
  a: 100,
  foo: function() {
    setTimeout(() => {
      console.log(this.a);
    }, 0);
  }
};
obj.foo(); // 100
let newObj = obj.foo; // 100
newObj() // 1
 


let myNew=function(constructor,...args){
  let obj={}
  Object.setPrototypeOf(obj,constructor.prototype)
  let result= constructor.apply(obj,...args)
  return result instanceof Object ? result:obj
}

let MyBind=function(obj, ...args){
  let self=this;
  
}

let debounce=function(fn,delay){
  let timer=null;
  return function(...args){
    clearTimeout(timer)
    timer=setTimeout(()=>fn.apply(this,...args).delay)
  }
}
let throttle=function(fn,delay){
  let timer;
  return function(...args){
    if(Now()-timer>0)
      timer=s
  }
}