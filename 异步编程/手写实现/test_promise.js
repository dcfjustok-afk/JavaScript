// 导入 MyPromise_middle
const MyPromise = require('./Promise.js').MyPromise_middle;

// 示例 1: 基本用法
console.log('=== 示例 1: 基本用法 ===');
const promise1 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('成功结果');
    }, 1000);
});

promise1.then(
    (value) => console.log('成功:', value),
    (reason) => console.log('失败:', reason)
);

// 示例 2: 链式调用
console.log('\n=== 示例 2: 链式调用 ===');
const promise2 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve(10);
    }, 500);
});

promise2
    .then(value => {
        console.log('第一步:', value);
        return value * 2;
    })
    .then(value => {
        console.log('第二步:', value);
        return value + 5;
    })
    .then(value => {
        console.log('第三步:', value);
    });

// 示例 3: 错误处理
console.log('\n=== 示例 3: 错误处理 ===');
const promise3 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        reject('发生错误');
    }, 800);
});

promise3
    .then(
        (value) => console.log('成功:', value),
        (reason) => {
            console.log('捕获错误:', reason);
            return '错误已处理';
        }
    )
    .then((value) => {
        console.log('后续操作:', value);
    });

// 示例 4: 模拟异步请求
console.log('\n=== 示例 4: 模拟异步请求 ===');
function fetchData(url) {
    return new MyPromise((resolve, reject) => {
        // 模拟网络请求
        setTimeout(() => {
            if (url.includes('error')) {
                reject('网络错误');
            } else {
                resolve(`来自 ${url} 的数据`);
            }
        }, 1200);
    });
}

fetchData('https://api.example.com/data')
    .then(data => {
        console.log('获取数据成功:', data);
        return fetchData('https://api.example.com/more-data');
    })
    .then(moreData => {
        console.log('获取更多数据成功:', moreData);
    })
    .then(() => {
        return fetchData('https://api.example.com/error');
    })
    .then(
        (value) => console.log('成功:', value),
        (error) => {
            console.log('捕获到错误:', error);
        }
    );

// 示例 5: 展示回调队列的作用
console.log('\n=== 示例 5: 回调队列演示 ===');
const promise5 = new MyPromise((resolve, reject) => {
    console.log('Promise 执行器开始执行');
    setTimeout(() => {
        console.log('准备改变 Promise 状态');
        resolve('状态改变为成功');
        console.log('Promise 状态已改变');
    }, 2000);
});

// 注册第一个回调
promise5.then((value) => {
    console.log('第一个回调执行:', value);
});

// 注册第二个回调
promise5.then((value) => {
    console.log('第二个回调执行:', value);
});

// 注册第三个回调
promise5.then((value) => {
    console.log('第三个回调执行:', value);
});

console.log('代码执行完成，等待异步操作...');
