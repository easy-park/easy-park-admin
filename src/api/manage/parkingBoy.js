import { request } from '@/util/request'

export function getParkingBoy () {
  return request({
    url: '/parkingBoys/all',
    method: 'GET'
  })
}
