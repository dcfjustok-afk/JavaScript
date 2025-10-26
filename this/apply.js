// apply和call的区别在于，apply接收的是一个数组，而call接收的是多个参数
// 下面我手动实现一下 apply
Function.prototype.myapply= function(obj,args){  // 能够看到这里是一个数组，而不是一个参数列表
    obj.p=this;
    obj.p(...args)
    delete obj.p;
}
