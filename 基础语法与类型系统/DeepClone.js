function deepClone(obj, map = new WeakMap()) {
  // 1️⃣ 基本类型和函数直接返回
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  if (map.has(obj)) {
    return map.get(obj);
  }
  //3️⃣ 获取对象的构造函数
  const constructor = obj.constructor;
  let cloneObj;

  // 4️⃣ 处理特殊类型
  switch (constructor) {
    case Date:
      cloneObj = new Date(obj);
      return cloneObj;
    case RegExp:
      cloneObj = new RegExp(obj.source, obj.flags);
      return cloneObj;
    case Map:
      cloneObj = new Map();
      map.set(obj, cloneObj);
      for (const [key, value] of obj) {
        cloneObj.set(deepClone(key, map), deepClone(value, map));
      }
      return cloneObj;
    case Set:
      cloneObj = new Set();
      map.set(obj, cloneObj);
      for (const value of obj) {
        cloneObj.add(deepClone(value, map));
      }
      return cloneObj;
    default:
      // 普通对象或数组
      cloneObj = Array.isArray(obj)
        ? []
        : Object.create(Object.getPrototypeOf(obj));
      map.set(obj, cloneObj);
  }
  // 5️⃣ 递归复制属性
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloneObj[key] = deepClone(obj[key], map);
    }
  }
  return cloneObj;
}

const obj = {
  num: 1,
  str: 'hello',
  bool: true,
  date: new Date(),
  reg: /\d+/,
  arr: [1, 2, { a: 3 }],
  map: new Map([['x', 10]]),
  set: new Set([1, 2]),
  fn: function() { console.log('hi'); },
};
obj.self = obj; // 循环引用

const newObj = deepClone(obj);

console.log(newObj);
console.log(newObj.self === newObj); // ✅ true
console.log(newObj.arr[2] !== obj.arr[2]); // ✅ true
console.log(newObj.fn === obj.fn); // ✅ true（函数只是拷贝引用）
