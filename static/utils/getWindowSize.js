 // 获取可视窗口的高度和宽度
 export default function getViewPortOffset() {
  if(window.innerWidth) {
    return {
      w: window.innerWidth
    }
  }else {
    if(document.compatMode === "BackCompat") {
      return {
        w: document.body.clientWidth
      }
    }else {
      return {
        w: document.documentElement.clientWidth
      }
    }
  }
 }