import axios from 'axios'
// 导入加载样式
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export default function http(config) {
  const instance = axios.create({
    // 在超时前，所有请求都会等待 2 秒
    timeout: 2000
  })

  // 请求拦截器
  instance.interceptors.request.use(config => {
    // 展示进度条
    NProgress.start()
    return config
  })

  // 相应拦截器
  instance.interceptors.response.use(result => {
    // 进度条加载完成
    NProgress.done()
    return result
  })

  return instance(config)
}