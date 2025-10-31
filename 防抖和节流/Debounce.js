// 防抖函数
function debounce(fn, delay) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
//防抖就是在事件触发n秒后再执行回调，如果在这n秒内事件又被触发，则重新计时。
// 场景：搜索框输入，用户输入完成后n秒再执行搜索操作。
// 下面是如何使用防抖函数：

const searchInput = document.getElementById('search-input');
const search = debounce(() => {
  console.log(searchInput.value);
}, 300);
searchInput.addEventListener('input', search);
// 当浏览器触发 input 事件时，浏览器底层会执行： search(event)

// 当用户输入
// 1、浏览器触发input事件
// 2、浏览器调用回调函数 search.call(searchInput, event)
    // 因此 此时 this 指向 searchInput 元素
    // args = [event]
// 3、进入返回的防抖函数：
// function(...args) {
//   clearTimeout(timer);
//   timer = setTimeout(() => fn.apply(this, args), delay);
// }
        /*  此时
        this = searchInput

        args = [event]

        fn = () => console.log(searchInput.value)
        */
//  4、
// setTimeout 延迟执行：

// () => fn.apply(this, args)


// 由于箭头函数不会绑定自己的 this，它的 this 会从外层作用域“继承”。
// 外层作用域的 this 是 searchInput，
// 所以：

// fn.apply(this, args) 等价于 fn.apply(searchInput, [event])