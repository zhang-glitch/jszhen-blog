
import 'antd/dist/antd.css'
import '../static/style/pages/common.css'
import App from 'next/app'
import React from 'react'
import { memorial } from '../public/utils/myUtils'
import NProgress from 'nprogress'
import Router from 'next/router'
import 'nprogress/nprogress.css'

//声明一个MyApp组件，然后这个组件用Provider进行包裹 react-redux。
export default class MyApp extends App {

  componentDidMount() {
    // 公祭日置灰
    memorial()

    // 控制台的显示内容
    console.log('%c 欢迎来到 jszhenBlog! ', 'background: rgba(18, 141, 244, 0.1); color: #1890ff');
    console.log('%c 如果你看到了这里，你一定具有一颗追求编程的心，让我们一起加油吧！', 'color: #1890ff');

    // 百度统计
    // var _hmt = _hmt || [];
    // (function () {
    //   var hm = document.createElement("script");
    //   hm.src = "https://hm.baidu.com/hm.js?8012cc8247fdc399904b23b2e8cb2266";
    //   var s = document.getElementsByTagName("script")[0];
    //   s.parentNode.insertBefore(hm, s);
    // })();

    // 点击鼠标的样式
    let index = 0;
    const fnTextPopup = (event) => {
      let arr = ['富强', '民主', '文明', '和谐', '自由', '平等', '公正', '法治', '爱国', '敬业', '诚信', '友善']
      if (!arr || !arr.length) {
        return;
      }

      let x = event.pageX,
        y = event.pageY;
      let eleText = document.createElement('span');
      eleText.className = 'text-popup';
      eleText.style.color = `rgb(${Math.random() * 256}, ${Math.random() * 256}, ${Math.random() * 256})`
      document.documentElement.appendChild(eleText);
      if (arr[index]) {
        eleText.innerHTML = arr[index];
      } else {
        index = 0;
        eleText.innerHTML = arr[0];
      }
      // 动画结束后删除自己
      eleText.addEventListener('animationend', function () {
        eleText.parentNode.removeChild(eleText);
      });
      // 位置
      eleText.style.left = (x - eleText.clientWidth / 2) + 'px';
      eleText.style.top = (y - eleText.clientHeight) + 'px';
      // index递增
      index++;
    };

    document.documentElement.addEventListener('click', fnTextPopup, false)
  }



  // componentWillUnmount() {
  //   if(!!fnTextPopup) {
  //     // 注销解绑事件
  //     document.documentElement.removeEventListener('click', fnTextPopup, false)
  //   }

  // }


}


//请求加载的进度条
Router.events.on('routeChangeStart', () => {
  NProgress.start();

  // 百度统计
  // window._hmt.push(['_trackPageview', location.pathname]);
})

Router.events.on('routeChangeComplete', () => {
  NProgress.done();
})

Router.events.on('routeChangeError', () => {
  NProgress.done();
})

