import { request } from '@/util/request'

const FREE = 0
const BUSY = 1

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

function selectParkingBoys (params) {
  return request({
    url: '/parkingBoys/list',
    method: 'GET',
    params
  })
}

function selectParkingBoyByPhoneNumber (phoneNumber) {
  return request({
    url: '/parkingBoys/list',
    method: 'GET',
    params: phoneNumber
  })
}

function selectParkingBoyById (parkingBoyId) {
  return request({
    url: '/parkingBoys/one',
    method: 'GET',
    params: parkingBoyId
  })
}

export {
  getParkingBoy,
  getAllParkingLotsAndParkingBoy,
  setParkingBoysParkingLots,
  changeParkingBoysParkingLots,
  selectParkingBoys,
  selectParkingBoyByPhoneNumber,
  selectParkingBoyById,
  FREE,
  BUSY
}
