// Promise.all() 方法

// 先看一下成功的案例
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "foo");
});

// async function test(){
//     const result = await Promise.all([promise1, promise2, promise3]);
//     console.log(result);
// }
// test()

Promise.all([promise1, promise2, promise3]).then((values) => {
  console.log(values);
});

const promise4= Promise.resolve(10)
const promise5= Promise.reject('error 调用失败！！')
const promise6= new Promise((resolve, reject) => {
    setTimeout(resolve, 100, 'bar');
})

Promise.all([promise4, promise5, promise6])
    // .then((values) => {
    //     console.log(values);
    // })
    .catch((reason) => {
        console.log(reason);
    })

  
// Promise.allSettled() 方法

let promise7=Promise.resolve(100)
let promise8=Promise.reject('error 调用失败！！')
let promise9= new Promise((resolve, reject) => {
    setTimeout(resolve, 100, 'bar');
})

Promise.allSettled([promise7, promise8, promise9])
    .then((values) => {
        console.log(values);
    })
// [
//   { status: 'fulfilled', value: 100 },
//   { status: 'rejected', reason: 'error 调用失败！！' },
//   { status: 'fulfilled', value: 'bar' }
// ]

