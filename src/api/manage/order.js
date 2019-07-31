import { request } from '@/util/request'

export function getOrder () {
  return request({
    url: '/parkingorderlist',
    method: 'GET'
  })
}

export function getOrdersByCarNumber (carnumber) {
  return request({
    url: '/parkingorderlist',
    method: 'GET',
    params: { carnumber }
  })
}

export function getOrdersByType (type) {
  return request({
    url: '/parkingorderlist',
    method: 'GET',
    params: { type }
  })
}

export function getOrdersByStatus (status) {
  return request({
    url: '/parkingorderlist',
    method: 'GET',
    params: { status }
  })
}
