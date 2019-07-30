<template>
  <div>
    <div class="table-operations">
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
      <template v-for="col in ['name', 'capacity']" :slot="col" slot-scope="text, record">
        <div :key="col">
          <a-input
            v-if="editingRecord && editingRecord.id === record.id"
            style="margin: -5px 0"
            :value="text"
            @change="e => handleChange(e.target.value, record, col)"></a-input>
          <template v-else>{{ text }}</template>
        </div>
      </template>
      <template slot="operation" slot-scope="text, record">
        <div class='editable-row-operations'>
          <span v-if="editingRecord && editingRecord.id === record.id">
            <a-button type="primary" @click="() => save(record)" :loading="isEditLoading">保存</a-button>
            <a-divider type="vertical" />
            <a-popconfirm title='确定取消？' @confirm="() => cancel(record)">
              <a>取消</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a @click="() => edit(record)">修改</a>
            <a-divider type="vertical" />
            <a @click="() => freeze(record)">注销</a>
          </span>
        </div>
      </template>
    </a-table>
  </div>
</template>

<script>
import { getParkingLot, updateParkingLot, queryParkingLotsByCapacity, queryParkingLotsByName } from '@/api/manage/parkingLot'

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
      isEditLoading: false,
      firstCapacity: 0,
      secondCapacity: 1,
      isQueryLoading: false
    }
  },
  mounted () {
    this.refreshData()
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
    freeze (record) {
    },
    save (record) {
      this.isEditLoading = true
      const newRecord = Object.assign({}, record, { 'capacity': Number(record.capacity) })
      updateParkingLot(newRecord).then(res => {
        this.$message.success('修改成功')
      }).catch(err => {
        this.$message.error(err.msg)
      }).finally(() => {
        this.isEditLoading = false
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
.table-operations {
  margin-bottom: 16px;
}

.table-operations > button {
  margin-right: 8px;
}
</style>
