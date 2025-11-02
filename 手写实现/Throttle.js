// 节流就是 事件触发后n 秒 不会再触发该事件
let Throttle=(fn,interval)=>{
    let last=0
    return function(...arg){
        let now=Date.Now();
        if(now-last>=interval){
            last=now;
            fn.apply(this,arg)
        }
           
    }
}