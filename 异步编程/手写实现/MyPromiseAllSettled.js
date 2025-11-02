Promise.myAllSettled=(promises)=>{
    return new Promise((resolve,reject)=>{
        if(!Array.isArray(promises)){
            throw new TypeError("Promise.allSettled expects an array");
        }
        let results=[];
        promises.forEach(promise => {
            promise.then((value)=>{
                results.push({status:"fulfilled",value});
            })
            .catch((err)=>{
                results.push({status:"rejected",reason:err});
            })
        });
        resolve(results);
    })
}