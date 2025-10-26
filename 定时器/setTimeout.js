/*
 * 定时器/setTimeout.js
 * 实现 setTimeout 函数
 * 
 * setTimeout 是什么？
 * setTimeout 是一个浏览器提供的函数，用于在指定的时间后执行一次回调函数。
 * setTimeout (callback, delay,...args)
 * 指定延迟 （delay毫秒）
 * 执行一次回调函数
 * 返回一个定时器ID，用于取消定时器
 * 
 */


//  先看一个 setTimeout 示例
function greet(name) {
  console.log(`Hello, ${name}!`);
}




(function(){
  console.log('下面开始执行还是，会有两秒的延时');
})()

const timerId = setTimeout(() => {
  console.log('Hello, World!');
}, 2000);


/*
非箭头函数回调中 ， this指向的是全局对象， 严格模式下，this指向undefined

使用箭头函数 可以避免 this 指向问题
 */
