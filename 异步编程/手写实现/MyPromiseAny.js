Promise.MyAny = (promises) => {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      throw new TypeError("Promise.any expects an array");
    }
    let results = [];
    promises.forEach((promise) => {
      promise
        .then((value) => {
          resolve(value);
        })
        .catch((err) => {
          results.push(err);
          if (results.length === promises.length) {
            reject(new AggregateError(results, "All promises were rejected"));
          }
        });
    });
  });
};
