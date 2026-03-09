// var a = 1;

// var obj = {
//   a: 100,
//   foo: function () {
//     setTimeout(() => {
//       console.log(this.a);
//     }, 0);
//   },
// };
// obj.foo(); // 100
// let newObj = obj.foo; // 100
// newObj(); // 1

// let myNew = function (constructor, ...args) {
//   let obj = {};
//   Object.setPrototypeOf(obj, constructor.prototype);
//   let result = constructor.apply(obj, ...args);
//   return result instanceof Object ? result : obj;
// };

// let MyBind = function (obj, ...args) {
//   let self = this;
// };

// let debounce = function (fn, delay) {
//   let timer = null;
//   return function (...args) {
//     clearTimeout(timer);
//     timer = setTimeout(() => fn.apply(this, ...args).delay);
//   };
// };
// let throttle = function (fn, delay) {
//   let timer;
//   return function (...args) {
//     if (Now() - timer > 0) timer = s;
//   };
// };

// class MyPromise {
//   constructor(executor) {
//     this.status = "pengding";
//     this.value = undefined;
//     this.reason = undefined;

//     this.onFullfillQueue = [];
//     this.onRejectQueue = [];

//     const resolve = () => {
//       if (this.status === "pending") {
//         this.status = "fullfilled";
//         queueMicrotask(() => {
//           this.onFullfillQueue.forEach((callback) => callback(this.value));
//         });
//       }
//     };
//     const reject = () => {
//       if (this.status === "pending") {
//         this.status = "rejected";
//         queueMicrotask(() => {
//           this.onRejectQueue.forEach((callback) => callback(this.reason));
//         });
//       }
//     };
//     try {
//       executor(resolve, reject);
//     } catch {
//       reject();
//     }
//   }
//   then = (onFullfill, onReject) => {
//     onFullfill =
//       typeof onFullfill === "function" ? onFullfill : (value) => value;
//     onReject = typeof onReject === "function" ? onReject : (reason) => reason;
//     return new MyPromise((resolve, reject) => {
//       if (this.status === "fullfilled") {
//         queueMicrotask(() => {
//           try {
//             let x = onFullfill(this.value);
//             resolve(x);
//           } catch (error) {
//             reject(error);
//           }
//         });
//       }
//       if (this.status === "rejected") {
//         queueMicrotask(() => {
//           try {
//             let x = onReject(this.reason);
//             resolve(x);
//           } catch (error) {
//             reject(error);
//           }
//         });
//       }
//       if (this === "pending") {
//         this.onFullfillQueue.push(onFullfill);
//         this.onRejectQueue.push(onReject);
//       }
//     });
//   };
// }

// new MyPromise((resolve) => {
//   resolve(1);
// })
//   .then((value) => {
//     console.log("第一次 then：", value);
//     // ❗️这里返回的是一个 Promise
//     // return new MyPromise((resolve) => {
//     //   setTimeout(() => resolve(value + 1), 1000);
//     // });
//     return "sadadas";
//   })
//   .then((value) => {
//     console.log("第二次 then：", value);
//   });

// let fun1 = (fn, breakTime) => {
//   let time = Date.now();
//    let count=0;
//   return (...args) => {
//     count++;
//     let now = Date.now();
   
//     if ((now - time ) ) {
//       fn.apply(this, ...args);
//       time = now;
//     }
//   };
// };

// let count = 0;
// let myInterval = (fn, breakTime) => {
//   let callback = fun1(fn, breakTime);
//   const intervalId = setInterval(callback, 1000);
// };

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

// 辅助函数：验证输入
function validateInput(n, m, a) {
    if (n !== a.length) {
        throw new Error(`数组长度应为${n}，但实际为${a.length}`);
    }
    if (n <= 0 || m < 0) {
        throw new Error('数组长度必须为正数，m必须为非负数');
    }
}

void async function () {
    try {
        const T_input = await readline();
        const T = parseInt(T_input);
        
        // 验证测试用例数量
        if (isNaN(T) || T <= 0) {
            console.error('测试用例数量必须为正整数');
            return;
        }
        
        for(let t=0;t<T;t++){
            try {
                const nm_input = await readline();
                const [n,m] = nm_input.split(' ').map(Number);
                
                const a_input = await readline();
                const a = a_input.split(' ').map(Number);
                
                // 验证输入合法性
                validateInput(n, m, a);
                
                let minLen = Infinity;
                
                // 从左到右遍历每个可能的右端点
                for(let r=0;r<n;r++){
                    // 对于每个右端点，遍历所有可能的左端点
                    for(let l=0;l<=r;l++){
                        let hasInversion = false;
                        
                        // 检查子数组 [l, r] 中是否存在逆序对
                        for(let i=l;i<r;i++){
                            // 计算位置i和i+1的元素在递增长度为(r-i)和(r-i-1)后的实际值
                            const currentVal = a[i] + (r - i) * m;
                            const nextVal = a[i+1] + (r - (i+1)) * m;
                            
                            // 如果存在逆序对，标记并跳出循环
                            if(currentVal > nextVal){
                                hasInversion = true;
                                break;
                            }
                        }
                        
                        // 如果存在逆序对，更新最小长度
                        if(hasInversion){
                            minLen = Math.min(minLen, r - l + 1);
                            // 一旦找到以r为右端点的最短无效子数组，可以提前终止内层循环
                            break;
                        }
                    }
                }
                
                // 输出结果
                console.log(minLen === Infinity ? -1 : minLen);
            } catch (error) {
                console.error(`处理测试用例 ${t+1} 时出错:`, error.message);
                // 尝试跳过当前测试用例，继续下一个
                continue;
            }
        }
    } catch (error) {
        console.error('程序执行出错:', error.message);
    } finally {
        rl.close(); // 确保在程序结束时关闭输入流
    }
}()
