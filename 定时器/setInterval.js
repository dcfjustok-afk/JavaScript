/*
 * 定时器/setInterval.js
 * 实现 setInterval 函数
 * 
 * setInterval 是什么？
 * setInterval 是一个浏览器提供的函数，用于按照指定的时间间隔重复执行回调函数。
 * setInterval (callback, delay,...args)
 * 指定时间间隔 （delay毫秒）
 * 重复执行回调函数
 * 返回一个定时器ID，用于取消定时器
 * 
 */

let count = 0;
const intervalId = setInterval(() => {
    count++
    console.log('Interval:', count);
    if(count>=5){
        clearInterval(intervalId);
    }
}, 1000);