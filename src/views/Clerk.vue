<template>
  <div>
    <div class="table-operations">
      <a-row :gutter="20">
        <a-col :span="2">
        </a-col>
        <a-col :span="12"></a-col>
        <a-col :span="3">
          <a-select defaultValue="id" style="width: 120px" v-model="select" >
            <a-select-option key="id" value="id">ID</a-select-option>
            <a-select-option key="name" value="name">姓名</a-select-option>
            <a-select-option key="email" value="email">Email</a-select-option>
            <a-select-option key="phone" value="phone">电话号码</a-select-option>
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
        <a-button @click="showModal(record)">修改</a-button>
      </span>
    </a-table>
    <a-modal width="600px" v-model="visible" title="停车场管理" @ok="handleOk" :destroyOnClose="true" :maskClosable="false" :footer="null">
      <ParkingLotTransfer :record="record"/>
    </a-modal>
  </div>
</template>
<script>
import { getParkingBoy, selectParkingBoys } from '@/api/manage/parkingBoy'
import ParkingLotTransfer from '@/components/ParkingLotTransfer'
export default {
  data () {
    return {
      visible: false,
      list: [],
      select: '',
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
    handleOk (e) {
      console.log(e)
    },
    showModal (record) {
      this.record = record
      this.visible = true
    },
    handleDelete () {
      this.$confirm({
        title: '确认冻结该账户？',
        content: '该账户将不可使用',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk () {
          console.log('OK')
        },
        onCancel () {
          console.log('Cancel')
        }
      })
    },
    handleSelect () {
      if (this.select === 'name') {
        selectParkingBoys({ 'name': this.input }).then(res => {
          if (res.status === 200) {
            this.list = res.data
          }
        })
      }
      console.log(this.select, this.input)
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
