import axios from 'axios'
import { message } from 'ant-design-vue'
import Cookies from 'js-cookie'

const STATUS_SUCCESS = 200

const instance = axios.create({
  baseURL: process.env.VUE_APP_REQUEST_BASE_URL,
  headers: {
    ContentType: 'application/json'
  }
})

instance.interceptors.request.use(function (config) {
  config.headers['Authorization'] = `Bearer ${Cookies.get('token')}`
  return config
})

function request (options) {
  return instance(options)
    .then(res => {
      const data = res.data
      if (data.status === STATUS_SUCCESS) {
        return data
      }
      return Promise.reject(data)
    })
    .catch(err => {
      if (err.response) {
        message.error('服务器异常')
      }
      return Promise.reject(err)
    })
}

export {
  instance as axios,
  request
}
