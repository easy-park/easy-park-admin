import { request } from '@/util/request'

export function getParkingDashboard () {
  return request({
    url: '/parkingDashboard',
    method: 'GET'
  })
}
