import { request } from '@/util/request'
import cookies from 'js-cookie'
import { Status } from '@/api/status'

function loadManagerProfile () {
  return request({
    url: '/manager',
    method: 'GET'
  })
}

function login (data) {
  return request({
    url: '/manager/login',
    method: 'POST',
    data
  }).then(res => {
    cookies.set('token', res.data)
    return loadManagerProfile()
  })
}

const VERIFICATION_FAILED = new Status(400, '用户名或密码错误')

export {
  login,
  loadManagerProfile,
  VERIFICATION_FAILED
}
