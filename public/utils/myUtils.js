import moment from 'moment'
export const memorial = () => {
  let now = moment().locale('zh-cn').format('MM-DD');
  if (
      now === '04-04' || // 清明
      now === '05-12' || // 汶川大地震
      now === '12-13' // 南京大屠杀
  ) {
      document.getElementsByTagName('html')[0].style = 'filter: grayscale(100%);'
  }
}



export const loadScript = (url, callback) => {
  // 检测是否加载了 js 文件
  const checkIsLoadScript = (src) => {
      let scriptObjs = document.getElementsByTagName('script');
      for (let sObj of scriptObjs) {
          if (sObj.src == src) {
              return true;
          }
      }
      return false;
  }

  if (checkIsLoadScript(url)) {
      callback();
      return false
  }

  let scriptNode = document.createElement("script");
  scriptNode.setAttribute("type", "text/javascript");
  scriptNode.setAttribute("src", url);
  document.body.appendChild(scriptNode);
  if (scriptNode.readyState) { //IE 判断
      scriptNode.onreadystatechange = () => {
          if (scriptNode.readyState == "complete" || scriptNode.readyState == 'loaded') {
              callback();
          }
      }
  } else {
      scriptNode.onload = () => {
          callback();
      }
  }
}


export const toTreeData = (data,pid) =>{
  function tree(id) {
      let arr = []
      data.filter(item => {
          return item.pid === id;
      }).forEach(item => {
          arr.push({
              ...item,
              children: tree(item.id)
          })
      })
      return arr
  }
  return tree(pid)  // 第一级节点的父id，是null或者0，视情况传入
}