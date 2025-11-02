// 接受一个可迭代的对象 （如数组） ，返回一个新的Rromise
// ✅ 全部成功：当所有 Promise 状态变为 fulfilled 时，返回一个按照原顺序的结果数组。

// ❌ 任意失败：一旦有一个 Promise 变为 rejected，Promise.all() 立刻 reject，并返回第一个错误。

Promise.all([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]).then(
  (res) => {
    console.log(res); // [1, 2, 3]
  }
);

Promise.all([Promise.resolve(1), Promise.resolve(2), Promise.reject(3)])
  .then((res) => {
    console.log(res); // [1, 2, 3]
  })
  .catch((err) => {
    console.log(err); // 3
  });

//下面来实现一下 Promise.all
// 1、接受一个可迭代的对象 （如数组） ，返回一个新的Rromise
// 2、当所有 Promise 状态变为 fulfilled 时，返回一个按照原顺序的结果数组。
// 3、一旦有一个 Promise 变为 rejected，Promise.all() 立刻 reject，并返回第一个错误。

Promise.myAll = function (promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      throw new TypeError("Promise.all expects an array");
    }
    const results = [];
    let count = 0;
    promises
      .forEach((promise, index) => {
        promise.then((value) => {
          results[index] = value;
          count++;
          if (count === promises.length) {
            resolve(results);
          }
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};
