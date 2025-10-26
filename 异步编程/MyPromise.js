// 首先，我们先来回顾一下Promise 的基本特征：
// promise 有三个状态：pending，fulfilled，or rejected；「规范 Promise/A+ 2.1」
// new promise时， 需要传递一个executor()执行器，执行器立即执行；
// executor接受两个参数，分别是resolve和reject；
// promise 的默认状态是 pending；
// promise 有一个value保存成功状态的值，可以是undefined/thenable/promise；「规范 Promise/A+ 1.3」
// promise 有一个reason保存失败状态的值；「规范 Promise/A+ 1.5」
// promise 只能从pending到rejected, 或者从pending到fulfilled，状态一旦确认，就不会再改变；
// promise 必须有一个then方法，then 接收两个参数，分别是 promise 成功的回调 onFulfilled, 和 promise 失败的回调 onRejected；「规范 Promise/A+ 2.2」
// 如果调用 then 时，promise 已经成功，则执行onFulfilled，参数是promise的value；
// 如果调用 then 时，promise 已经失败，那么执行onRejected, 参数是promise的reason；
// 如果 then 中抛出了异常，那么就会把这个异常作为参数，传递给下一个 then 的失败的回调onRejected；


class SimplePromise {
    constructor(executor) {
        this.status = 'pending'
        this.value = undefined
        this.reason = undefined
        // 下面 是 存放 成功或失败 的 回调函数队列
        this.onFulfilledCallbacks = []
        this.onRejectedCallbacks = []

        const resolve = (value) => {
            if (this.status === 'pending') {
                this.status = 'fulfilled'
                this.value = value
                // 当状态改变为 fulfilled 时，调用所有成功回调函数
                this.onFulfilledCallbacks.forEach(callback=>{
                    queueMicrotask(() => {
                        callback(this.value)
                    })
                })
            }
        }
        const reject = (reason) => {
            if (this.status === 'pending') {
                this.status = 'rejected'
                this.reason = reason
                // 当状态改变为 rejected 时，调用所有失败回调函数
                this.onRejectedCallbacks.forEach(callback=>{
                    queueMicrotask(() => {
                        callback(this.reason)
                    })
                })
            }
        }
        
        try {
            // 执行 executor 函数，将 resolve 和 reject 函数作为参数传递
            executor(resolve, reject)
        } catch (error) {
            // 如果 executor 函数抛出异常，直接调用 reject 函数
            reject(error)
        }
    }
    then(onFulfilled, onRejected) {
        // 处理 onFulfilled 和 onRejected 函数的默认值
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
        onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }
        return new SimplePromise((resolve, reject) => {
            if (this.status === 'fulfilled') {
                queueMicrotask(() => {
                    try {
                        const result = onFulfilled(this.value)
                        resolve(result)
                    } catch (error) {
                        reject(error)
                    }
                })
            }
            if (this.status === 'rejected') {
                queueMicrotask(() => {
                    try {
                        const result = onRejected(this.reason)
                        resolve(result)
                    } catch (error) {
                        reject(error)
                    }
                })
            }
            if (this.status === 'pending') {
                this.onFulfilledCallbacks.push(callback => {
                    queueMicrotask(() => {
                        try {
                            const result = onFulfilled(callback)
                            resolve(result)
                        } catch (error) {
                            reject(error)
                        }
                    })
                })
                this.onRejectedCallbacks.push(callback => {
                    queueMicrotask(() => {
                        try {
                            const result = onRejected(callback)
                            resolve(result)
                        } catch (error) {
                            reject(error)
                        }
                    })
                })
            }
        })
    }
    

}
