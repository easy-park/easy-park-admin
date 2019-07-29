import { request } from '@/util/request'

export function getParkingLot () {
  return request({
    url: '/parking_lots',
    method: 'GET'
  })
}
