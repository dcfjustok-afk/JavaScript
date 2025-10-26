function person(){
    console.log(this.name);   
}
let egg={
    name:"鸡蛋"
}
person(); // undefined
person.call(egg); // egg

// 这就是 call 的功能 ，  会绑定 this  

//下面我手动实现一下

Function.prototype.mycall= function(obj) {
    obj.p=this;
    obj.p();
    delete obj.p;
}
person.mycall(egg)

// 下面 模仿有多个函数的时候的情况

function say(word1,word2,word3){
    console.log(this.sort)
    console.log(word1,word2,word3);
}
let dog={
    name:"来福",
    sort:"Wolf!!"
}

Function.prototype.mycall2= function(obj,...args){
    obj.p=this;
    obj.p(...args)
    delete obj.p;
}
say.mycall2(dog,"骨头","鸡蛋","蔬菜")