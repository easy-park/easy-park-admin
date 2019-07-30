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

export {
  getStaffList,
  createStaff
}
