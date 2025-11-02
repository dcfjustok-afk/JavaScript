Promise.MyRace= function (promises){
    return new Promise((resolve,reject)=>{
        if(!Array.isArray(promises)){
            throw new TypeError("Promise.race expects an array");
        }
        promises.forEach((promise)=>{
            promise.then((value)=>{
                resolve(value);
            })
            .catch((err)=>{
                reject(err);
            })
        })
    })
}