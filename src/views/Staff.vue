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
    <a-table bordered :columns="columns" :dataSource="list" :rowKey="(record, index) => `${record.id}-${index}`">
      <template slot="id" slot-scope="text, record, index">{{ `${record.position}-${index + 1}` }}</template>
      <span slot="operation" slot-scope="text, record">
        <a href="javascript:;" @click="onUpdateClick(text, record)">修改</a>
        <a-divider type="vertical" />
        <a href="javascript:;" @click="onFreezeClick(text, record)">冻结</a>
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
import { getStaffList, createStaff, getStaffById, getStaffByName, getStaffByEmail, getStaffByPhone } from '@/api/manage/staff'
import { EMAIL as EMAIL_REGEXP, MOBILE_PHONE as MOBILE_PHONE_REGEXP } from '@/util/regexp'

const columns = [{
  dataIndex: 'id',
  title: 'Id',
  scopedSlots: { customRender: 'id' }
}, {
  dataIndex: 'name',
  title: '姓名'
}, {
  dataIndex: 'email',
  title: '邮箱'
}, {
  title: '电话号码',
  dataIndex: 'phoneNumber'
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
      searchText: ''
    }
  },
  mounted () {
    this.refreshData()
  },
  methods: {
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
    onUpdateClick () {
      // 点击 修改 按钮的逻辑
    },
    onFreezeClick () {
      // 点击 冻结 按钮的逻辑
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
