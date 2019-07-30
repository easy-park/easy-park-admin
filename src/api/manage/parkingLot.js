import { request } from '@/util/request'

function getParkingLot () {
  return request({
    url: '/parking_lots',
    method: 'GET'
  })
}

function updateParkingLot (data) {
  return request({
    url: '/parking_lots',
    method: 'PUT',
    data
  })
}

function queryParkingLotsByCapacity (start, end) {
  return request({
    url: '/parking_lots',
    method: 'GET',
    params: { start, end }
  })
}

function queryParkingLotsByName (name) {
  return request({
    url: '/parking_lots',
    method: 'GET',
    params: { name }
  })
}

export {
  getParkingLot,
  updateParkingLot,
  queryParkingLotsByCapacity,
  queryParkingLotsByName
}
