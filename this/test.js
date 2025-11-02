var a = 1;

var obj = {
  a: 100,
  foo: function () {
    setTimeout(() => {
      console.log(this.a);
    }, 0);
  }
};
obj.foo(); // 100
let newObj = obj.foo; // 100
newObj() // 1



let myNew = function (constructor, ...args) {
  let obj = {}
  Object.setPrototypeOf(obj, constructor.prototype)
  let result = constructor.apply(obj, ...args)
  return result instanceof Object ? result : obj
}

let MyBind = function (obj, ...args) {
  let self = this;

}

let debounce = function (fn, delay) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, ...args).delay)
  }
}
let throttle = function (fn, delay) {
  let timer;
  return function (...args) {
    if (Now() - timer > 0)
      timer = s
  }
}

class MyPromise {
  constructor(executor) {
    this.status = 'pengding'
    this.value = undefined;
    this.reason = undefined;

    this.onFullfillQueue = [];
    this.onRejectQueue = [];

    const resolve = () => {
      if (this.status === 'pending') {
        this.status = 'fullfilled'
        queueMicrotask(() => {
          this.onFullfillQueue.forEach(callback => callback(this.value))
        })
      }
    }
    const reject = () => {
      if (this.status === 'pending') {
        this.status='rejected'
        queueMicrotask(() => {
          this.onRejectQueue.forEach(callback => callback(this.reason))
        })
      }
    }
    try {
      executor(resolve, reject)
    } catch {
      reject()
    }
  }
  then = (onFullfill, onReject)=>{
    onFullfill = typeof onFullfill === 'function' ? onFullfill : value => value;
    onReject = typeof onReject === 'function' ? onReject : reason => reason;
    return new MyPromise((resolve, reject) => {
      if (this.status === 'fullfilled') {
        queueMicrotask(()=>{
          try{
            let x=onFullfill(this.value)
            resolve(x)
          }catch(error){
            reject(error)
          }
        })
      }
      if(this.status==='rejected'){
        queueMicrotask(()=>{
          try{
            let x=onReject(this.reason)
            resolve(x)
          }catch(error){
            reject(error)
          }
        })
      }
      if(this==='pending'){
        this.onFullfillQueue.push(onFullfill)
        this.onRejectQueue.push(onReject)
      }
    })
  }
}


new MyPromise((resolve) => {
  resolve(1);
})
.then(value => {
  console.log('第一次 then：', value);
  // ❗️这里返回的是一个 Promise
  // return new MyPromise((resolve) => {
  //   setTimeout(() => resolve(value + 1), 1000);
  // });
  return "sadadas"
})
.then(value => {
  console.log('第二次 then：', value);
});