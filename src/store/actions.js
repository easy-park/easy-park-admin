import { getStaffList } from '@/api/manage/staff.js'

const action = {
  get (context, data) {
    getStaffList().then(res => {
      console.log(res)
    })
  }
}

export default action;