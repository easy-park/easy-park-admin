const STATUS_TAG = Symbol('STATUS_TAG')
const MESSAGE_TAG = Symbol('MESSAGE_TAG')

class Status {
  [STATUS_TAG]
  [MESSAGE_TAG]

  constructor (status, message) {
    this[STATUS_TAG] = status
    this[MESSAGE_TAG] = message
  }

  get STATUS () {
    return this[STATUS_TAG]
  }

  get MESSAGE () {
    return this[MESSAGE_TAG]
  }
}

const UNKNOWN_ERROR = new Status(0, '未知错误')

export {
  Status,
  UNKNOWN_ERROR
}
