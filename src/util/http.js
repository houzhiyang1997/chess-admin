import axios from 'axios'
import { ElLoading } from 'element-plus'

// const http = axios.create({
//   baseURL: 'http://127.0.0.1:5000/admin',
//   timeout: 5000
// })

// 拦截器
let loading = null
http.interceptors.request.use(
  config => {
    loading = ElLoading.service({
      lock: true,
      text: 'Loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    return config
  },
  error => {
    loading.close()
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  response => {
    loading.close()
    return response
  },
  error => {
    loading.close()
    return Promise.reject(error)
  }
)

export default http
