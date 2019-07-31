<template>
  <div>
    <div class="order">
      <a-row :gutter="20">
        <a-col :span="6"></a-col>
        <a-col :span="6">
          类型：
          <a-select style="width: 120px" v-model="selectType" @change="searchByType">
            <a-select-option value="存车">存车</a-select-option>
            <a-select-option value="取车">取车</a-select-option>
          </a-select>
        </a-col>
        <a-col :span="6">
          状态：
          <a-select style="width: 120px" v-model="selectStatus" @change="searchByStatus">
            <a-select-option value="无人处理">无人处理</a-select-option>
            <a-select-option value="已完成">已完成</a-select-option>
            <a-select-option value="存取中">存取中</a-select-option>
          </a-select>
        </a-col>
        <a-col :span="6">
          车牌号
          <a-input-search
            placeholder="请输入车牌号"
            style="width: 200px"
            v-model="carNumber"
            @search="searchByCarNumber"
          />
        </a-col>
      </a-row>
    </div>
    <a-table bordered :pagination="pagination" :columns="columns" :dataSource="list" @change="handleChange" :rowKey="record => record.id">
      <template slot="orderType" slot-scope="record">{{ getOrderType(record.status) }}</template>
      <template slot="orderStatus" slot-scope="record">{{ getOrderStatus(record.status) }}</template>
      <span slot="operation" slot-scope="record">
        <a href="javascript:;" v-show="record.status === 1" @click="showParkingBoys(record)">指派</a>
        <a href="javascript:;" v-show="record.status === 4" @click="remind(record)">提醒</a>
        <a-modal title="停车员" v-model="show" :mask=false :footer="null">
          <a-row>姓名：{{ parkingBoy.name }}</a-row>
          <a-row>邮箱：{{ parkingBoy.email }}</a-row>
          <a-row>电话：{{ parkingBoy.phoneNumber }}</a-row>
        </a-modal>
        <a-modal title="选择停车员" v-model="visible" @ok="assign()" width="700px" :mask=false>
          <ParkingBoys v-on:getParkingBoyId="parkingBoyId = $event" :parkingBoys = "parkingBoys"/>
        </a-modal>
      </span>
    </a-table>
  </div>
</template>

<script>
import { getOrder, getOrdersByType, getOrdersByStatus, getOrdersByCarNumber, assignOrder } from '@/api/manage/order'
import { getParkingBoy } from '@/api/manage/parkingBoy'
import ParkingBoys from './ParkingBoys'
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: '车牌号',
    dataIndex: 'carNumber',
    key: 'carNumber'
  },
  {
    title: '类型',
    key: 'orderType',
    scopedSlots: { customRender: 'orderType' }
  },
  {
    title: '状态',
    key: 'orderStatus',
    scopedSlots: { customRender: 'orderStatus' }
  },
  {
    title: '操作',
    key: 'operation',
    scopedSlots: { customRender: 'operation' }
  }
]
export default {
  components: {
    ParkingBoys
  },
  data () {
    return {
      filteredInfo: null,
      sortedInfo: null,
      pagination: {},
      list: [],
      columns,
      carNumber: '',
      selectType: '',
      selectStatus: '',
      visible: false,
      order: {},
      parkingBoys: [],
      parkingBoyId: 0,
      show: false,
      parkingBoy: {}
    }
  },
  beforeMount () {
    this.loadOrders()
    getParkingBoy().then(res => {
      this.parkingBoys = res.data
    })
  },
  methods: {
    loadOrders () {
      getOrder().then(res => {
        if (res.status === 200) {
          this.list = this.sortList(res.data)
        }
      })
    },
    getOrderType (status) {
      if (status > 3) {
        return '取车'
      } else {
        return '存车'
      }
    },
    getOrderStatus (status) {
      if (status === 1 || status === 4) {
        return '无人处理'
      } else if (status === 6) {
        return '已完成'
      } else {
        return '存取中'
      }
    },
    handleChange (pagination, filters, sorter) {
      this.filteredInfo = filters
      this.sortedInfo = sorter
    },
    sortList (list) {
      let firstArray = list.filter(element => element.status === 2 || element.status === 3 || element.status === 5)
      let middleArray = list.filter(element => element.status === 1 || element.status === 4)
      let lastArray = list.filter(element => element.status === 6)
      return firstArray.concat(middleArray, lastArray)
    },
    searchByCarNumber () {
      getOrdersByCarNumber(this.carNumber).then(res => {
        this.list = res.data
      })
    },
    searchByType () {
      getOrdersByType(this.selectType).then(res => {
        this.list = res.data
      })
    },
    searchByStatus () {
      getOrdersByStatus(this.selectStatus).then(res => {
        this.list = res.data
      })
    },
    showParkingBoys (record) {
      this.visible = true
      this.order = record
    },
    assign () {
      assignOrder(this.order.id, this.parkingBoyId).then(res => {
        this.$message.success('指派成功！')
        this.loadOrders()
      }).catch(error => {
        this.$message.error(error.msg)
      }).finally(() => {
        this.visible = false
        this.parkingBoyId = 0
      })
    },
    remind (record) {
      this.show = true
      this.parkingBoy = record.parkingBoy
    }
  }
}
</script>

<style scoped>
.order {
  margin-bottom: 16px;
}
</style>
