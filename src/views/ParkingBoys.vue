<template>
  <div>
    <a-row style="margin-bottom: 10px; text-align: center">
      <a-col :span="2"></a-col>
      <a-col :span="4">姓名</a-col>
      <a-col :span="6">电话</a-col>
      <a-col :span="8">邮箱</a-col>
      <a-col :span="4">状态</a-col>
    </a-row>
    <a-radio-group v-model="parkingBoyId" class="modal-list" @change="$emit('getParkingBoyId', parkingBoyId)">
      <a-row style="height: 40px" v-for="(item,index) in parkingBoys" :key="index">
        <a-col :span="2"><a-radio name="parkingBoy" :key="item.id" :value="item.id"></a-radio></a-col>
        <a-col :span="4">{{ item.name }}</a-col>
        <a-col :span="6">{{ item.phoneNumber }}</a-col>
        <a-col :span="8">{{ item.email }}</a-col>
        <a-col :span="4">{{ getStatus(item.status) }}</a-col>
      </a-row>
    </a-radio-group>
  </div>
</template>

<script>
import { FREE } from '@/api/manage/parkingBoy'
export default {
  name: 'parkingBoys',
  props: ['parkingBoys'],
  data () {
    return {
      parkingBoyId: 0
    }
  },
  methods: {
    getStatus (status) {
      if (status === FREE) {
        return '空闲'
      } else {
        return '忙碌'
      }
    }
  }
}
</script>

<style scoped>
.modal-list {
  max-height: 40vh;
  overflow: scroll;
  width: 100%;
  text-align: center
}
</style>
