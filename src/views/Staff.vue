<template>
  <div>
    <div class="table-operations">
      <a-row :gutter="20">
        <a-col :span="2">
          <a-button type="primary" @click="onCreateClick">新建</a-button>
        </a-col>
        <a-col :span="11"></a-col>
        <a-col :span="3">
          <a-select style="width: 120px" v-model="searchMethod">
            <a-select-option key="id" value="id">ID</a-select-option>
            <a-select-option key="name" value="name">姓名</a-select-option>
            <a-select-option key="email" value="email">邮箱</a-select-option>
            <a-select-option key="phone" value="phone">电话号码</a-select-option>
          </a-select>
        </a-col>
        <a-col :span="6">
          <a-input v-model="searchText" @keydown.enter="search"></a-input>
        </a-col>
        <a-col :span="2">
          <a-button type="primary" @click="search">搜索</a-button>
        </a-col>
      </a-row>
    </div>
    <a-table bordered :columns="columns" :dataSource="list" :rowKey="generegeKey">
      <template slot="id" slot-scope="text, record">{{ generegeKey(record) }}</template>
      <template slot="email" slot-scope="text, record">
        <a-input v-if="editRecord && generegeKey(editRecord) === generegeKey(record)"
        :value="text" @change="e => handleChange(e.target.value, record, 'email')"></a-input>
        <template v-else>{{ text }}</template>
      </template>
      <template slot="phone" slot-scope="text, record">
        <a-input v-if="editRecord && generegeKey(editRecord) === generegeKey(record)"
        :value="text" @change="e => handleChange(e.target.value, record, 'phoneNumber')"></a-input>
        <template v-else>{{ text }}</template>
      </template>
      <span slot="operation" slot-scope="text, record">
        <template v-if="editRecord && generegeKey(editRecord) === generegeKey(record)">
          <a href="javascript:;" @click="save(record)">保存</a>
          <a-divider type="vertical" />
          <a href="javascript:;" @click="cancel(record)">取消</a>
        </template>
        <template v-else>
          <a href="javascript:;" @click="onUpdateClick(record)">修改</a>
          <a-divider type="vertical" v-show="record.status !== ADMIN"/>
          <a href="javascript:;" @click="onFreezeClick(record)" v-show="record.status !== ADMIN">{{ getBtnName(record.status) }}</a>
          <a-select style="width: 120px; float: right" @change="assignPosition($event, record)">
            <a-select-option value="Admin">管理员</a-select-option>
            <a-select-option value="ParkingBoy">停车员</a-select-option>
            <a-select-option value="Manage">经理</a-select-option>
          </a-select>
        </template>
      </span>
    </a-table>
    <a-modal
      title="新建员工"
      :visible="createStaffModalVisible"
      :closable="false"
      @ok="handleCreateOk"
      okText="新建"
      :confirmLoading="confirmLoading"
      cancelText="取消"
      @cancel="handleCreateCancel">
      <a-form :form="form">
        <a-form-item label="用户名" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
          <a-input
            v-decorator="[
              'username',
              {rules: [{ required: true, message: '请输入员工登录用户名' }]}
            ]"></a-input>
        </a-form-item>
        <a-form-item label="姓名" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
          <a-input
            v-decorator="[
              'name',
              {rules: [{ required: true, message: '请输入员工姓名' }]}
            ]"></a-input>
        </a-form-item>
        <a-form-item label="邮箱" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
          <a-input
            v-decorator="[
              'email',
              {rules: [
                { required: true, message: '请输入员工邮箱' },
                { required: true, message: '邮箱格式错误', validator: validateEmail }
              ]}
            ]"></a-input>
        </a-form-item>
        <a-form-item label="电话" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
          <a-input
            v-decorator="[
              'phoneNumber',
              {rules: [
                { required: true, message: '请输入员工电话' },
                { required: true, message: '电话格式错误', validator: validateMobilePhone }
              ]}
            ]"></a-input>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { getStaffList, createStaff, getStaffById, getStaffByName, getStaffByEmail, getStaffByPhone, update, updateStatus, assignPosition } from '@/api/manage/staff'
import { EMAIL as EMAIL_REGEXP, MOBILE_PHONE as MOBILE_PHONE_REGEXP } from '@/util/regexp'
import { FREEZ, ADMIN, ACTIVE } from '@/api/manage/clerk-status'

const columns = [{
  dataIndex: 'id',
  title: 'Id',
  scopedSlots: { customRender: 'id' }
}, {
  dataIndex: 'name',
  title: '姓名'
}, {
  dataIndex: 'email',
  title: '邮箱',
  scopedSlots: { customRender: 'email' }
}, {
  title: '电话号码',
  dataIndex: 'phoneNumber',
  scopedSlots: { customRender: 'phone' }
}, {
  title: '操作',
  scopedSlots: { customRender: 'operation' }
}]

export default {
  data () {
    return {
      createStaffModalVisible: false,
      confirmLoading: false,
      form: this.$form.createForm(this),
      columns,
      list: [],
      searchMethod: '',
      searchText: '',
      editRecord: undefined,
      ADMIN: ADMIN
    }
  },
  mounted () {
    this.refreshData()
  },
  methods: {
    generegeKey (record) {
      return `${record.position}-${record.id}`
    },
    refreshData () {
      return getStaffList().then(res => {
        this.list = res.data
      }).catch(err => {
        this.$message.error(err.msg)
      })
    },
    validateEmail (rule, value, callback) {
      if (value && !new RegExp(EMAIL_REGEXP).test(value)) {
        callback(rule.message)
        return
      }
      callback()
    },
    validateMobilePhone (rule, value, callback) {
      if (value && !new RegExp(MOBILE_PHONE_REGEXP).test(value)) {
        callback(rule.message)
        return
      }
      callback()
    },
    onCreateClick () {
      this.createStaffModalVisible = true
    },
    onUpdateClick (record) {
      this.editRecord = record
    },
    onFreezeClick (record) {
      if (record.status === FREEZ) {
        const newRecord = Object.assign(record)
        newRecord.status = ACTIVE
        updateStatus(newRecord).then(res => {
          const index = this.list.findIndex(item => this.generegeKey(record) === this.generegeKey(item))
          this.$set(this.list, index, res.data)
          this.$message.success('解冻成功')
          this.refreshData()
        })
        return
      }
      if (record.status !== FREEZ) {
        this.$confirm({
          title: '确认冻结该账户？',
          content: '该账户将不可使用',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk: () => {
            const newRecord = Object.assign(record)
            newRecord.status = FREEZ
            updateStatus(newRecord).then(res => {
              const index = this.list.findIndex(item => this.generegeKey(record) === this.generegeKey(item))
              this.$set(this.list, index, res.data)
              this.$message.success('冻结成功')
              this.refreshData()
            })
          }
        })
      }
    },
    handleCreateOk () {
      this.form.validateFields((errors, values) => {
        if (!errors) {
          this.confirmLoading = true
          createStaff(values).then(res => {
            return this.refreshData()
          }).then(res => {
            this.createStaffModalVisible = false
            this.$message.info('创建成功')
          }).catch(err => {
            this.$message.error(err.message)
          }).finally(() => {
            this.confirmLoading = false
          })
        }
      })
    },
    getBtnName (status) {
      if (status !== FREEZ) {
        return '冻结'
      }
      if (status === FREEZ) {
        return '解冻'
      }
    },
    handleCreateCancel () {
      this.createStaffModalVisible = false
    },
    search () {
      switch (this.searchMethod) {
        case 'id':
          this.find(getStaffById)
          break
        case 'name':
          this.find(getStaffByName)
          break
        case 'email':
          this.find(getStaffByEmail)
          break
        case 'phone':
          this.find(getStaffByPhone)
          break
      }
    },
    find (findMethod) {
      findMethod(this.searchText).then(res => {
        this.list = res.data
      }).catch(error => {
        this.$message.error(error.msg)
      })
    },
    cancel (record) {
      const index = this.list.findIndex(item => this.generegeKey(record) === this.generegeKey(item))
      this.$set(this.list, index, this.editRecord)
      this.editRecord = undefined
    },
    save (record) {
      update(record).then(res => {
        const index = this.list.findIndex(item => this.generegeKey(res.data) === this.generegeKey(item))
        this.$set(this.list, index, res.data)
        this.$message.success('修改成功')
      }).catch(err => {
        this.$message.error(err.msg)
      }).finally(() => {
        this.editRecord = undefined
      })
    },
    handleChange (value, record, column) {
      const index = this.list.findIndex(item => this.generegeKey(record) === this.generegeKey(item))
      const newRecord = Object.assign({}, record, { [column]: value })
      this.$set(this.list, index, newRecord)
    },
    assignPosition (value, record) {
      let staff = { id: record.id, originPosition: 'Employee', newPosition: value }
      if (record.position !== 'Employee') {
        staff.originPosition = record.position
      }
      assignPosition(staff).then(res => {
        const staff = res.data
        const index = this.list.findIndex(item => this.generegeKey(record) === this.generegeKey(item))
        this.$set(this.list, index, staff)
        this.$message.success('分配成功！')
      }).catch(error => {
        this.$message.error(error.msg)
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
