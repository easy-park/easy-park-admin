<template>
  <div>
    <div class="parking-lot">
      <a-row :gutter="20">
        <a-col :span="2">
          <a-button type="primary">新建</a-button>
        </a-col>
        <a-col :span="11"></a-col>
        <a-col :span="3">
          <a-select style="width: 100%" v-model="selectedQueryField">
            <a-select-option value="name">名字</a-select-option>
            <a-select-option value="capacity">容量</a-select-option>
          </a-select>
        </a-col>
        <a-col :span="6">
          <a-input v-if="selectedQueryField === 'name'" v-model="queryText"></a-input>
          <template v-else-if="selectedQueryField === 'capacity'">
            <a-input-number :min="0" v-model="firstCapacity"></a-input-number>
            <a-input-number :min="1" v-model="secondCapacity"></a-input-number>
          </template>
        </a-col>
        <a-col :span="2">
          <a-button type="primary" @click="onQueryClick" :loading="isQueryLoading">搜索</a-button>
        </a-col>
      </a-row>
    </div>
    <a-table bordered :columns="columns" :dataSource="data" :rowKey="record => record.id">
      <template slot="name" slot-scope="text, record">
        <a-input
          v-if="editingRecord && editingRecord.id === record.id"
          :value="text"
          @change="e => handleChange(e.target.value, record, 'name')"></a-input>
        <template v-else>{{ text }}</template>
      </template>
      <template slot="capacity" slot-scope="text, record">
        <a-input-number
          v-if="editingRecord && editingRecord.id === record.id"
          :value="text"
          :min="1"
          @change="value => handleChange(value, record, 'capacity')"></a-input-number>
        <template v-else>{{ text }}</template>
      </template>
      <template slot="operation" slot-scope="text, record">
        <div class='editable-row-operations'>
          <span v-if="editingRecord && editingRecord.id === record.id">
            <a @click="() => save(record)">保存</a>
            <a-divider type="vertical" />
            <a-popconfirm title='确定取消？' @confirm="() => cancel(record)" cancelText="取消" okText="确定">
              <a>取消</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a @click="() => edit(record)">修改</a>
            <a-divider type="vertical" />
            <a @click="() => freezeOrActive(record)" :style="record.status | mapOppositeStatusColor">{{ record.status | mapOppositeStatus }}</a>
          </span>
        </div>
      </template>
    </a-table>
  </div>
</template>

<script>
import { getParkingLot, updateParkingLot, queryParkingLotsByCapacity, queryParkingLotsByName } from '@/api/manage/parkingLot'
import { FROZEN, ACTIVE } from '@/api/manage/parking-lot-status'

const columns = [
  {
    title: 'ID',
    dataIndex: 'id'
  },
  {
    title: '名字',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '容量',
    dataIndex: 'capacity',
    scopedSlots: { customRender: 'capacity' }
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
      columns,
      editingRecord: undefined,
      data: [],
      selectedQueryField: 'name',
      queryText: '',
      firstCapacity: 0,
      secondCapacity: 1,
      isQueryLoading: false
    }
  },
  mounted () {
    this.refreshData()
  },
  filters: {
    mapOppositeStatus (status) {
      return status === FROZEN ? '启用' : '停用'
    },
    mapOppositeStatusColor (status) {
      return status === FROZEN ? {} : { color: 'red' }
    }
  },
  methods: {
    refreshData () {
      return getParkingLot().then(res => {
        this.data = res.data
      }).catch(err => {
        this.$message.error(err.message)
      })
    },
    handleChange (value, record, column) {
      const index = this.data.findIndex(item => record.id === item.id)
      const newRecord = Object.assign({}, record, { [column]: value })
      this.$set(this.data, index, newRecord)
    },
    edit (record) {
      this.editingRecord = record
    },
    freezeOrActive (record) {
      switch (record.status) {
        case FROZEN: {
          const newRecord = Object.assign({}, record, { status: ACTIVE })
          return this.updateParkingLotStatus(newRecord, '正在启用', '启用成功')
        }
        default: {
          const newRecord = Object.assign({}, record, { status: FROZEN })
          return this.updateParkingLotStatus(newRecord, '正在停用', '停用成功')
        }
      }
    },
    updateParkingLotStatus (newRecord, loadingMsg, successMsg) {
      const finishLoading = this.$message.loading(loadingMsg, 0)
      return updateParkingLot(newRecord).then(res => {
        const index = this.data.findIndex(item => res.data.id === item.id)
        this.$set(this.data, index, res.data)
        this.$message.success(successMsg)
      }).catch(err => {
        this.$message.error(err.msg)
      }).finally(() => {
        finishLoading()
      })
    },
    save (record) {
      const finishLoading = this.$message.loading('正在修改', 0)
      const newRecord = Object.assign({}, record, { 'capacity': Number(record.capacity) })
      updateParkingLot(newRecord).then(res => {
        const index = this.data.findIndex(item => res.data.id === item.id)
        this.$set(this.data, index, res.data)
        this.$message.success('修改成功')
      }).catch(err => {
        this.$message.error(err.msg)
      }).finally(() => {
        finishLoading()
        this.editingRecord = undefined
      })
    },
    cancel (record) {
      const index = this.data.findIndex(item => record.id === item.id)
      this.$set(this.data, index, this.editingRecord)
      this.editingRecord = undefined
    },
    onQueryClick () {
      switch (this.selectedQueryField) {
        case 'name': return this.queryParkingLotsByName()
        case 'capacity': return this.queryParkingLotsByCapacity()
      }
    },
    queryParkingLotsByName () {
      this.isQueryLoading = true
      queryParkingLotsByName(this.queryText).then(res => {
        this.data = res.data
      }).catch(err => {
        this.$message.error(err.msg)
      }).finally(() => {
        this.isQueryLoading = false
      })
    },
    queryParkingLotsByCapacity () {
      const start = Math.min(this.firstCapacity, this.secondCapacity)
      const end = Math.max(this.firstCapacity, this.secondCapacity)
      this.isQueryLoading = true
      queryParkingLotsByCapacity(start, end).then(res => {
        this.data = res.data
      }).catch(err => {
        this.$message.error(err.msg)
      }).finally(() => {
        this.isQueryLoading = false
      })
    }
  }
}
</script>
<style scoped>
.parking-lot {
  margin-bottom: 16px;
}
</style>
