/*
 * @Author: jhd
 * @Date: 2019-01-14 16:40:52
 * @Description: axios config file
 */
import axios from 'axios'
import app from '../main'
import { loginIn } from '../utils/logginIn'

const ajaxconfig = {
  baseURL: process.env.NODE_ENV === 'production' ? 'https://api.jinhaidi.cn/admin/' : 'http://localhost:3000/admin/',
  timeout: 5000,
  isRetryRequest: false
}

const ajax = axios.create(ajaxconfig)

// 拦截器
ajax.interceptors.request.use((config: any) => {
  // 在发送请求显示加载动画
  // loadinginstace
  if (window.localStorage.getItem('TOKEN')) {
    config.params = {
      ...config.params,
      'token': window.localStorage.getItem('TOKEN')
    }
    // config.headers.Authorization = `Bearer ${JSON.parse(window.localStorage.getItem('TOKEN') || '').token}`
  }
  return config
}, (error: string) => {
  return Promise.reject(error)
})

ajax.interceptors.response.use((response: any) => {
    switch (response.data.code) {
      case -1:
        app.$message({
          message: response.data.message,
          type: 'warning'
        })
        app.$router.push({
          path: '/login',
          query: { redirect: app.$route.fullPath }
        })
        break
      case 201:
        app.$message({
          message: response.data.message,
          type: 'success'
        })
        break
      case 202:
        app.$message({
          message: response.data.message,
          type: 'warning'
        })
        break
      case 500:
        app.$message({
          message: response.data.message,
          type: 'error'
        })
        break
      default:
        break
    }
    switch (response.status) {
      case 404:
        app.$router.push({
          path: '/404',
          query: { redirect: app.$route.fullPath }
        })
        break
      default:
        break
    }
    return response
  },
  (error: any) => {
    if (!loginIn) {
      app.$alert('用户信息已过期，请点击确定后重新登陆！', '提示', {
        confirmButtonText: '确定',
        callback: action => app.$router.push({
          path: '/login',
          query: { redirect: app.$route.fullPath }
        })
      })
    }
    return Promise.reject(error)
  }
)
export default ajax
