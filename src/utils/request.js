import axios from 'axios'
import { getToken } from './auth'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
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
    if (response.data instanceof Blob) return response.data
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
    if (error.response.status === 401) {
      store.commit('user/delTokenMutation')
      router.push('/login')
      Message({
        message: error.response.data.message || '请求失败',
        type: 'error'
      })
      return Promise.reject(error)
    }
    Message({
      message: error.response.data.message || '请求失败',
      type: 'error'
    })

    return Promise.reject(error)
  }
)

export default service
