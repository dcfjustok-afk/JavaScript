// 防抖就是 n秒之内如果 又发生 。则重新计时
//  应用场景 ： 搜索框 搜索 ，只有等 用户停止输入一段时间后才开始搜素
let Debounce = (fn ,delay) => {
    let time;
    return function(...args){
        clearTimeout(time)
        time=setTimeout(()=>fn.apply(this,args),delay)
    }
}