// 1、基本使用
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        const success = true;
        if (success) {
            resolve('成功')            
        } else {
            reject('失败')
        }
    }, 1000)
})

// 2、使用 .then() 方法处理成功和失败
promise.then((value) => {
    console.log(value); // 成功时输出：成功
}).catch((reason) => {
    console.log(reason); // 失败时输出：失败
})



//下面 是Promise  链式调用的示例

function step1() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('step1 完成');
            resolve(1)
        }, 1000)
    })
}
function step2(value) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('step2 完成');
            resolve(value + 1)
        }, 1000)
    })
}
function step3(value) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error('step3 失败了！'))
        }, 1000)
    })
}


//下面开始 链式调用
step1()
    .then(step2)
    .then(step3)
    .then(finalResult => {
        //下面这个不会执行，因为step3失败了
        console.log("所以步骤成功完成，最终结果为：",finalResult); 
    })
    .catch((reason) => {
        console.log(reason.message); // 失败时输出：step3失败了！
    })
    .finally(() => {
        console.log("无论成功失败，都要执行的操作");
    })