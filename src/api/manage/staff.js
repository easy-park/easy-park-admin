import { request } from '@/util/request'

export function getStaffList () {
  return request({
    url: '/clerks',
    method: 'GET'
  })
}
