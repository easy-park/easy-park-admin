import { request } from '@/util/request'

function sendMessage () {
  return request({
    url: 'sendMessage',
    method: 'GET'
  })
}

export {
  sendMessage
}
