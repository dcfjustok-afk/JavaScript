// 手写实现promise

// Promise 是用来管理异步状态的对象
// 三种状态
// 1. 等待中（pending）
// 2. 已完成（fulfilled）
// 3. 已拒绝（rejected）

// 一旦状态改变，就不会再改变
// 只能从等待中（pending）到已完成（fulfilled）或已拒绝（rejected）

// // 先来一个 简单的 [简易版的Promise]
// 我需要实现下面的功能

// const p = new MyPromise_easy((resolve, reject) => {
//   resolve("成功");
// });
// p.then((res) => {
//   console.log(res);
// });

// ✅ 实现思路
// 创建一个类 MyPromise
// 定义三个状态：pending、fulfilled、rejected
// 构造函数接收 executor(resolve, reject)
// resolve / reject 改变状态并保存结果
// then(onFulfilled, onRejected) 执行对应的回调

class MyPromise_easy {
  constructor(executor) {
    this.status = "pending";
    this.value = undefined;
    this.reason = undefined;
    const resolve = (value) => {
      if (this.status === "pending") {
        this.status = "fulfilled";
        this.value = value;
      }
    };
    const reject = (reason) => {
      if (this.status === "pending") {
        this.status = "rejected";
        this.reason = reason;
      }
    };
    // 执行 executor
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  then(onFulfilled, OnRejected) {
    if (this.status === "fulfilled") {
      onFulfilled(this.value);
    }
    if (this.status === "rejected") {
      OnRejected(this.reason);
    }
  }
}

const p = new MyPromise_easy((resolve, reject) => {
  reject("失败");
});
p.then(
  (res) => {
    console.log(res);
  },
  (reason) => {
    console.log(reason);
  }
);

// 上面这个能跑，但是还有很多问题
// | 问题                   | 说明                                 |
// | -----------            | ---------------------------------- |
// | ① 不能处理异步任务      | 如果 `resolve` 在定时器中执行，`then` 不会拿到结果 |
// | ② 不支持链式调用        | 无法 `p.then(...).then(...)`         |
// | ③ 异常没有捕获          | reject 只接收显式调用，没处理错误传播             |
// | ④ 回调没有微任务队列     | 原生 Promise 的回调是异步的（在微任务中执行）        |

// const p1 = new MyPromise_middle((resolve, reject) => {
//   setTimeout(() => resolve(100), 1000);
// });

// p1.then(value => {
//   console.log('第一次：', value); // 100
//   return value * 2;
// }).then(value => {
//   console.log('第二次：', value); // 200
// });

// 现在 需要在 之前已有的已有的 基础上 实现 链式调用 和 异步处理
// 问题	           原因	                                        解决方式
// ① 支持异步任务	resolve 在定时器中执行时，then 提前执行	        把 then 回调存起来，等状态改变后再执行
// ② 支持链式调用	then 返回的不是 Promise	                        then 必须返回一个新的 Promise，用于“链式调用”

class MyPromise_middle {
  constructor(executor) {
    this.status = "pending";
    this.value = undefined;
    this.reason = undefined;
    //存储回调函数维护一个 数组, 用于 存储 所有的 成功/失败 回调函数
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.status === "pending") {
        this.status = "fulfilled";
        this.value = value;
        // 执行所有的 成功回调
        this.onFulfilledCallbacks.forEach((useCallback) =>
          useCallback(this.value)
        );
      }
    };
    const reject = (reason) => {
      if (this.status === "pending") {
        this.status = "rejected";
        this.reason = reason;
        // 执行所有的 失败的回调函数
        this.onRejectedCallbacks.forEach((useCallback) =>
          useCallback(this.reason)
        );
      }
    };
    executor(resolve, reject);
  }
  then(onFulfilled, onRejected) {
    //处理 onFulfilled/ onRejected 的种类问题 ,当 没有传递 对应的 回调函数时, 我们需要 传递一个 默认的 函数
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value; // 当 没有传递 成功回调时, 我们默认 传递一个 函数, 直接返回 value  ，也就是说将 上一个 Promise 的 value 传递给 下一个 Promise
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          }; // 当 没有传递 失败回调时, 我们默认 传递一个 函数, 直接抛出 异常 ，也就是说将 上一个 Promise 的 reason 传递给 下一个 Promise
    // 返回一个 新的Promise
    return new MyPromise_middle((resolve, reject) => {
      if (this.status === "fulfilled") {
        queueMicrotask(() => {
          try {
            const result = onFulfilled(this.value);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        });
      }
      if (this.status === "rejected") {
        queueMicrotask(() => {
          try {
            const result = onRejected(this.reason);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        });
      }
      if (this.status === "pending") {
        this.onFulfilledCallbacks.push(() => {
          queueMicrotask(() => {
            try {
              const x = onFulfilled(this.value);
              resolve(x);
            } catch (error) {
              reject(error);
            }
          });
        });

        this.onRejectedCallbacks.push(() => {
          queueMicrotask(() => {
            try {
              const x = onRejected(this.reason);
              resolve(x);
            } catch (error) {
              reject(error);
            }
          });
        });
      }
    });
  }
}

const p1 = new MyPromise_middle((resolve, reject) => {
  setTimeout(() => {
    resolve(100);
  }, 1000);
});

p1.then(value => {
  console.log('第一次：', value); // 100
  return value * 2;
}).then(value => {
  console.log('第二次：', value); // 200
});


 