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
        <a href="javascript:;" v-show="record.status === 4">提醒</a>
        <a-modal title="选择停车员" v-model="visible" @ok="assign()" width="700px" :mask=false>
          <a-row style="margin-bottom: 10px; text-align: center">
            <a-col :span="2"></a-col>
            <a-col :span="4">姓名</a-col>
            <a-col :span="6">电话</a-col>
            <a-col :span="8">邮箱</a-col>
            <a-col :span="4">状态</a-col>
          </a-row>
          <a-radio-group v-model="parkingBoyId" class="modal-list">
            <a-row style="height: 40px" v-for="(item,index) in parkingBoys" :key="index">
              <a-col :span="2"><a-radio name="parkingBoy" :key="item.id" :value="item.id"></a-radio></a-col>
              <a-col :span="4">{{ item.name }}</a-col>
              <a-col :span="6">{{ item.phoneNumber }}</a-col>
              <a-col :span="8">{{ item.email }}</a-col>
              <a-col :span="4">{{ getStatus(item.status) }}</a-col>
            </a-row>
          </a-radio-group>
        </a-modal>
      </span>
    </a-table>
  </div>
</template>

<script>
import { getOrder, getOrdersByType, getOrdersByStatus, getOrdersByCarNumber, assignOrder } from '@/api/manage/order'
import { getParkingBoy, FREE } from '@/api/manage/parkingBoy'

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
      parkingBoyId: 0
    }
  },
  beforeMount () {
    getOrder().then(res => {
      if (res.status === 200) {
        this.list = this.sortList(res.data)
      }
    })
    getParkingBoy().then(res => {
      this.parkingBoys = res.data
    })
  },
  methods: {
    getOrderType (status) {
      if (status > 3) {
        return '取车'
      } else {
        return '存车'
      }
    },
    getStatus (status) {
      if (status === FREE) {
        return '空闲'
      } else {
        return '忙碌'
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
      })
    }
  }
}
</script>

<style scoped>
.order {
  margin-bottom: 16px;
}
.modal-list {
  max-height: 40vh;
  overflow: scroll;
  width: 100%;
  text-align: center
}
</style>
