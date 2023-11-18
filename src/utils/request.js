import axios from 'axios'
import { getToken } from './auth'
import { Message } from 'element-ui'
const service = axios.create({
  // 将api文件夹中的地址进行拼接
  // baseURL: '/api',
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// request interceptor
service.interceptors.request.use(
  config => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    if (response.data.success) {
      return response.data
    } else {
      Message({
        message: response.data.message || '请求失败',
        type: 'error'
      })
      return Promise.reject(response)
    }
  },
  error => {
    Message({
      message: error.response.data.message || '请求失败',
      type: 'error'
    })

    return Promise.reject(error)
  }
)

export default service
