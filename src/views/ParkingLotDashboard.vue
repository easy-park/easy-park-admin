<template>
  <a-list
    :grid="{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 2, xl: 2, xxl: 3 }"
    :dataSource="list"
  >
    <a-list-item slot="renderItem" slot-scope="item">
      <div>
      <a-card :title="item.name" hoverable>
        <a-row>
          <a-col :lg="12" :md="24">
            <span v-if="item.status === 0">
              <a-progress type="circle" :percent="100" :format="() => '已冻结'" strokeColor="grey" status="normal"/>
            </span>
            <span v-else-if="item.available/item.capacity === 1">
              <a-progress type="circle" :percent="0"/>
            </span>
            <span v-else-if="item.available/item.capacity === 0">
              <a-progress type="circle" :percent="100" :format="() => '已满'" status="exception" />
            </span>
            <span v-else>
              <a-progress type="circle" :percent="item.available/item.capacity*100" />
            </span>
          </a-col>
          <a-col :lg="12" :md="24">
            <span style="font-size: medium;">
              剩余容量：{{item.available}} / 总容量：{{item.capacity}}
            </span>
            <br/>
            <br/>
            <span style="font-size: 20px;">
              <a-icon type="user" />{{item.parkingBoy!==null ? " 停车员："+item.parkingBoy.name : " 尚未分配"}}
            </span>
          </a-col>
        </a-row>
      </a-card>
      </div>
    </a-list-item>
  </a-list>
</template>

<script>
import { getParkingDashboard } from '@/api/manage/dashboard'
export default {
  name: 'ParkingLotDashboard',
  data () {
    return {
      list: []
    }
  },
  mounted () {
    getParkingDashboard().then(res => {
      if (res.status === 200) {
        this.list = res.data
      }
    })
  }
}
</script>

<style scoped>

</style>
