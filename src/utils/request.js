import axios from 'axios'
import {Message, MessageBox} from 'element-ui'
import store from '@/store'
import {getToken} from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API // api 的 base_url
  // timeout: 1000 * 60 * 30
})

// request interceptor
service.interceptors.request.use(
  config => {
    const firstUrl = window.location.pathname.split('/')[1]
    config.headers['tn_id'] = firstUrl
    config.headers['content-type'] = 'application/json'
    // Do something before request is sent
    if (store.getters.token) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      config.headers['X-Token'] = getToken()
    }
    if (config.params != null) {
      for (let i in config.params) {
        if (config.params[i] === '') {
          config.params[i] = null
        }
      }
    }
    if (config.data != null) {
      for (let i in config.data) {
        if (config.data[i] === '') {
          config.data[i] = null
        }
      }
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (response.headers['content-type'].indexOf('application/octet-stream') > -1 ||
      response.headers['content-type'].indexOf('application/msexcel') > -1) {
      let blob = new Blob([response.data], {
        type: 'application/vnd.ms-excel'
      })
      let downloadElement = document.createElement('a')
      let href = window.URL.createObjectURL(blob)
      let filename = response.headers['filename']
      downloadElement.href = href
      downloadElement.download = filename == null ? '导出文件.xlsx' : filename
      document.body.appendChild(downloadElement)
      downloadElement.click()
      document.body.removeChild(downloadElement)
      window.URL.revokeObjectURL(href)
      return response.data
    }
    // if (response.headers['content-type'].indexOf('application/msexcel') > -1) {
    //   let blob = new Blob([response.data], {
    //     type: 'application/vnd.ms-excel'
    //   })
    //   let downloadElement = document.createElement('a')
    //   let href = window.URL.createObjectURL(blob)
    //   downloadElement.href = href
    //   downloadElement.download = '导出文件.xlsx'
    //   document.body.appendChild(downloadElement)
    //   downloadElement.click()
    //   document.body.removeChild(downloadElement)
    //   window.URL.revokeObjectURL(href)
    //   return response.data
    // }
    if (res.code !== 0) {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // 请自行在引入 MessageBox
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
