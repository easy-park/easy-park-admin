<template>
  <div>
    <div class="table-operations">
      <a-row :gutter="20">
        <a-col :span="2">
        </a-col>
        <a-col :span="12"></a-col>
        <a-col :span="3">
          <a-select style="width: 120px" v-model="select">
            <a-select-option value="id">ID</a-select-option>
            <a-select-option value="name">姓名</a-select-option>
            <a-select-option value="phone">电话号码</a-select-option>
          </a-select>
        </a-col>
        <a-col :span="3">
          <a-input v-model="input"></a-input>
        </a-col>
        <a-col :span="2">
          <a-button type="primary" @click="handleSelect">搜索</a-button>
        </a-col>
        <a-col :span="2">
          <a-button @click="handleReset">重置</a-button>
        </a-col>
      </a-row>
    </div>
    <a-table :columns="columns" :dataSource="list" :rowKey="record => record.id">
      <span slot="operation" slot-scope="text, record">
        <a-button @click="showModal(record)" type="primary">分配停车场</a-button>
      </span>
    </a-table>
    <a-modal width="600px" v-model="visible" title="停车场管理" :destroyOnClose="true" :maskClosable="false" :footer="null">
      <ParkingLotTransfer :record="record"/>
    </a-modal>
  </div>
</template>
<script>
import { getParkingBoy, selectParkingBoys, selectParkingBoyByPhoneNumber, selectParkingBoyById } from '@/api/manage/parkingBoy'
import ParkingLotTransfer from '@/components/ParkingLotTransfer'
export default {
  data () {
    return {
      visible: false,
      list: [],
      select: 'id',
      input: '',
      record: {}
    }
  },
  components: {
    ParkingLotTransfer
  },
  mounted () {
    getParkingBoy().then(res => {
      if (res.status === 200) {
        this.list = res.data
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
          title: '姓名',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email'
        },
        {
          title: '电话号码',
          dataIndex: 'phoneNumber',
          key: 'phone'
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
    showModal (record) {
      this.record = record
      this.visible = true
    },
    handleSelect () {
      if (this.select === 'name') {
        selectParkingBoys({ 'name': this.input }).then(res => {
          if (res.status === 200) {
            this.list = res.data
          }
        })
      }
      if (this.select === 'phone') {
        selectParkingBoyByPhoneNumber({ 'phoneNumber': this.input }).then(res => {
          if (res.status === 200) {
            this.list = res.data
          }
        })
      }
      if (this.select === 'id') {
        selectParkingBoyById({ 'parkingBoyId': this.input }).then(res => {
          this.list = []
          this.list[0] = res.data
        }).catch(error => {
          this.$message.success(error.msg)
        })
      }
    },
    handleReset () {
      getParkingBoy().then(res => {
        if (res.status === 200) {
          this.list = res.data
        }
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
