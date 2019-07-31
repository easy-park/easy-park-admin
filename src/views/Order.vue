<template>
  <div>
    <div class="order">
      <a-row :gutter="20">
        <a-col :span="16"></a-col>
        <a-col :span="3">
          <a-select style="width: 120px" placeholder="选择查询条件">
            <a-select-option key="id" value="id">订单号</a-select-option>
            <a-select-option key="carNumber" value="carNumber">车牌号</a-select-option>
            <a-select-option key="orderType" value="orderType">类型</a-select-option>
            <a-select-option key="orderStatus" value="orderStatus">状态</a-select-option>
          </a-select>
        </a-col>
        <a-col :span="3">
          <a-input></a-input>
        </a-col>
        <a-col :span="2">
          <a-button type="primary">搜索</a-button>
        </a-col>
      </a-row>
    </div>
    <a-table bordered :pagination="pagination" :columns="columns" :dataSource="list" @change="handleChange" :rowKey="record => record.id">
      <span slot="operation" slot-scope="record">
        <a href="javascript:;" v-show="record.status === 1">指派</a>
        <a href="javascript:;" v-show="record.status === 4">提醒</a>
      </span>
    </a-table>
  </div>
</template>
<script>
import { getOrder } from '@/api/manage/order'
export default {
  data () {
    return {
      filteredInfo: null,
      sortedInfo: null,
      pagination: {},
      list: []
    }
  },
  beforeMount () {
    getOrder().then(res => {
      if (res.status === 200) {
        this.list = res.data
        this.list.forEach(element => {
          if (element.status > 3) {
            element.orderType = '取车'
          } else {
            element.orderType = '存车'
          }
          if (element.status === 1 || element.status === 4) {
            element.orderStatus = '无人处理'
          } else if (element.status === 6) {
            element.orderStatus = '已完成'
          } else {
            element.orderStatus = '存取中'
          }
        })
        this.list = this.sortList(this.list)
      }
    })
  },
  computed: {
    columns () {
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
          dataIndex: 'orderType',
          key: 'orderType'
        },
        {
          title: '状态',
          dataIndex: 'orderStatus',
          key: 'orderStatus'
        },
        {
          title: '操作',
          key: 'operation',
          scopedSlots: { customRender: 'operation' }
        }
      ]
      return columns
    }
  },
  methods: {
    handleChange (pagination, filters, sorter) {
      this.filteredInfo = filters
      this.sortedInfo = sorter
    },
    sortList (list) {
      let firstArray = list.filter(element => element.status === 2 || element.status === 3 || element.status === 5)
      let middleArray = list.filter(element => element.status === 1 || element.status === 4)
      let lastArray = list.filter(element => element.status === 6)
      return firstArray.concat(middleArray, lastArray)
    }
  }
}
</script>

<style scoped>
.order {
  margin-bottom: 16px;
}
</style>
