import { request } from '@/util/request'

function getStaffList () {
  return request({
    url: '/clerks',
    method: 'GET'
  })
}

function createStaff (staff) {
  return request({
    url: '/employees',
    method: 'POST',
    data: staff
  })
}

function getStaffById (id) {
  return request({
    url: '/clerklist',
    method: 'GET',
    params: { id }
  })
}

function getStaffByName (name) {
  return request({
    url: '/clerklist',
    method: 'GET',
    params: { name }
  })
}

function getStaffByEmail (email) {
  return request({
    url: '/clerklist',
    method: 'GET',
    params: { email }
  })
}

function getStaffByPhone (phone) {
  return request({
    url: '/clerklist',
    method: 'GET',
    params: { phone }
  })
}

export {
  getStaffList,
  createStaff,
  getStaffById,
  getStaffByName,
  getStaffByEmail,
  getStaffByPhone
}
