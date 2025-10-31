// 节流函数
function throttle(fn, interval) {
  let last = 0;
  return function(...args) {
    const now = Date.now();
    if (now - last >= interval) {
      last = now;
      fn.apply(this, args);
    }
  };
}

// 节流函数使用示例
const searchInput = document.getElementById('search-input');
const search = throttle(() => console.log(searchInput.value), 300);
searchInput.addEventListener('input', search);
// 当用户输入
// 1、浏览器触发input事件
// 2、浏览器调用回调函数 search.call(searchInput, event)
    // 因此 此时 this 指向 searchInput 元素
    // 3、执行 fn.apply(this, args) 即 fn.apply(searchInput, [event])
    // 4、打印 searchInput.value
    // 5、等待 300ms
    // 6、如果用户在 300ms 内没有输入，会打印 searchInput.value
    // 7、如果用户在 300ms 内输入了新的内容，会重新开始等待 300ms