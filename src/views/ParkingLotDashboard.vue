<template>
  <a-list
    :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }"
    :dataSource="data"
  >
    <a-list-item slot="renderItem" slot-scope="item">
      <a-card :title="item.title">
        <a-progress type="circle" :percent="75" />
        <span style="font-size: x-large;float: right;padding-top: 25px"><a-icon type="user" />停车员：张三</span>
      </a-card>
    </a-list-item>
  </a-list>
</template>

<script>
const data = [
  {
    title: '停车场1'
  },
  {
    title: '停车场2'
  },
  {
    title: '停车场3'
  },
  {
    title: '停车场4'
  },
  {
    title: '停车场5'
  },
  {
    title: '停车场6'
  }
]
export default {
  name: 'ParkingLotDashboard',
  data () {
    return {
      data
    }
  }
}
</script>

<style scoped>

</style>
