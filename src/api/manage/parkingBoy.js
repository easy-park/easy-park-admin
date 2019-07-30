import { request } from '@/util/request'

function getParkingBoy () {
  return request({
    url: '/parkingBoys/all',
    method: 'GET'
  })
}

function getAllParkingLotsAndParkingBoy (id) {
  return request({
    url: '/parking_lots_boys',
    method: 'GET',
    params: { parkingBoyId: id }
  })
}

function setParkingBoysParkingLots (params) {
  return request({
    url: '/manager/parkingBoy',
    method: 'POST',
    data: params
  })
}

function changeParkingBoysParkingLots (params) {
  return request({
    url: '/manager/parkingBoy',
    method: 'PUT',
    data: params
  })
}

export {
  getParkingBoy,
  getAllParkingLotsAndParkingBoy,
  setParkingBoysParkingLots,
  changeParkingBoysParkingLots
}
