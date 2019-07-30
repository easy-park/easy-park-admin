import { request } from '@/util/request'

export function getOrder () {
  return request({
    url: '/parkingOrderlist',
    method: 'GET'
  })
}
