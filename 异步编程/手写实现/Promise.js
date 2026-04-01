class MyPromise {
    constructor(executor){
        this.status='pending'
        this.value=undefined;
        this.reason=undefined;
        const resolve=()=>{
            this.status='fulfilled'
            this.value=value
        }
        const reject=()=>{
            this.status='rejected'
            this.reason=reason
        }
        executor(resolve,reject)
    }
}


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

// 导出 MyPromise_middle
module.exports = {
  MyPromise_middle
};