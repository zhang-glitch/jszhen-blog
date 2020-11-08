
// 节流函数
// export function throttle(fn, delay = 200) {
//   // 4、通过闭包保存一个标记
//   let canRun = true;
//   return function () {
//     // 5、在函数开头判断标志是否为 true，不为 true 则中断函数
//     if (!canRun) {
//       return;
//     }
//     // 6、将 canRun 设置为 false，防止执行之前再被执行
//     canRun = false;
//     // 7、定时器
//     setTimeout(() => {
//       fn.call(this, arguments);
//       // 8、执行完事件（比如调用完接口）之后，重新将这个标志设置为 true
//       canRun = true;
//     }, delay);
//   };
// }


export default function throttle(fn, delay=200) {
  var timer;
  return function () {
      var _this = this;
      var args = arguments;
      if (timer) {
          return;
      }
      timer = setTimeout(function () {
          fn.apply(_this, args);
          timer = null; // 在delay后执行完fn之后清空timer，此时timer为假，throttle触发可以进入计时器
      }, delay)
  }
}


