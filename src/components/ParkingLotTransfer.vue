<template>
  <div>
    <a-transfer
      :dataSource="parkingLots"
      :titles="['可选停车场', '管理的停车场']"
      :listStyle="{
        width: '250px',
        height: '300px',
      }"
      showSearch
      :targetKeys="targetKeys"
      @change="handleChange"
      :render="item => item.title"
      :rowKey="record => record.id"
    />
  </div>
</template>
<script>
import { getAllParkingLotsAndParkingBoy, setParkingBoysParkingLots, changeParkingBoysParkingLots } from '@/api/manage/parkingBoy'
export default {
  data () {
    return {
      parkingLots: [],
      targetKeys: []
    }
  },
  props: {
    record: Object
  },
  mounted () {
    getAllParkingLotsAndParkingBoy(this.record.id).then(res => {
      if (res.status === 200) {
        this.targetKeys = res.data.boysParkingLots.map(item => item.id)
        this.parkingLots = res.data.parkingLots.map((item) => {
          item['key'] = item.id
          item['title'] = item.status === 2 ? '(' + item.available + ' / ' + item.capacity + ')' + item.name + ' (已分配)' : '(' + item.available + ' / ' + item.capacity + ')' + item.name
          if (item.status !== 1 && this.targetKeys.indexOf(item.id) === -1) {
            item['disabled'] = true
          } else if (item.status !== 1 && this.targetKeys.indexOf(item.id) > -1 && item.available !== item.capacity) {
            item['disabled'] = true
          }
          return item
        })
      }
    })
  },
  methods: {
    handleChange (nextTargetKeys, direction, moveKeys) {
      if (direction === 'right') {
        const setList = this.parkingLots.filter(item => moveKeys.indexOf(item.id) > -1).map(item => item.id)
        setParkingBoysParkingLots({ 'list': setList, 'id': parseInt(this.record.id) }).then(res => {
          if (res.status === 200) {
            getAllParkingLotsAndParkingBoy(this.record.id).then(res => {
              if (res.status === 200) {
                this.targetKeys = res.data.boysParkingLots.map(item => item.id)
                this.parkingLots = res.data.parkingLots.map((item) => {
                  item['key'] = item.id
                  item['title'] = item.status === 2 ? '(' + item.available + ' / ' + item.capacity + ')' + item.name + ' (已分配)' : '(' + item.available + ' / ' + item.capacity + ')' + item.name
                  if (item.status !== 1 && this.targetKeys.indexOf(item.id) === -1) {
                    item['disabled'] = true
                  } else if (item.status !== 1 && this.targetKeys.indexOf(item.id) > -1 && item.available !== item.capacity) {
                    item['disabled'] = true
                  }
                  return item
                })
              }
            })
          }
        })
      } else {
        const setList = this.parkingLots.filter(item => moveKeys.indexOf(item.id) > -1).map(item => item.id)
        changeParkingBoysParkingLots({ 'list': setList, 'id': parseInt(this.record.id) }).then(res => {
          if (res.status === 200) {
            getAllParkingLotsAndParkingBoy(this.record.id).then(res => {
              if (res.status === 200) {
                this.targetKeys = res.data.boysParkingLots.map(item => item.id)
                this.parkingLots = res.data.parkingLots.map((item) => {
                  item['key'] = item.id
                  item['title'] = item.status === 2 ? '(' + item.available + ' / ' + item.capacity + ')' + item.name + ' (已分配)' : '(' + item.available + ' / ' + item.capacity + ')' + item.name
                  if (item.status !== 1 && this.targetKeys.indexOf(item.id) === -1) {
                    item['disabled'] = true
                  } else if (item.status !== 1 && this.targetKeys.indexOf(item.id) > -1 && item.available !== item.capacity) {
                    item['disabled'] = true
                  }
                  return item
                })
              }
            })
          }
        })
      }
    }
  }
}
</script>
