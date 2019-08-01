<template>
  <a-modal
    title="新建员工"
    :visible="createStaffModalVisible"
    :closable="false"
    @ok="handleCreateOk"
    okText="新建"
    :confirmLoading="confirmLoading"
    cancelText="取消"
    @cancel="$emit('update', false)">
    <a-form :form="form">
      <a-form-item label="用户名" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
        <a-input
          v-decorator="[
                'username',
                {rules: [{ required: true, message: '请输入员工登录用户名' }]}
              ]"
        ></a-input>
      </a-form-item>
      <a-form-item label="姓名" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
        <a-input
          v-decorator="[
                'name',
                {rules: [{ required: true, message: '请输入员工姓名' }]}
              ]"
        ></a-input>
      </a-form-item>
      <a-form-item label="邮箱" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
        <a-input
          v-decorator="[
                'email',
                {rules: [
                  { required: true, message: '请输入员工邮箱' },
                  { required: true, message: '邮箱格式错误', validator: validateEmail }
                ]}
              ]"
        ></a-input>
      </a-form-item>
      <a-form-item label="电话" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
        <a-input
          v-decorator="[
                'phoneNumber',
                {rules: [
                  { required: true, message: '请输入员工电话' },
                  { required: true, message: '电话格式错误', validator: validateMobilePhone }
                ]}
              ]"
        ></a-input>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { EMAIL as EMAIL_REGEXP, MOBILE_PHONE as MOBILE_PHONE_REGEXP } from '@/util/regexp'
import { createStaff, getStaffList } from '@/api/manage/staff'
export default {
  name: 'addClerk',
  props: ['createStaffModalVisible'],
  data () {
    return {
      form: this.$form.createForm(this),
      confirmLoading: false
    }
  },
  methods: {
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
    handleCreateOk () {
      this.form.validateFields((errors, values) => {
        if (!errors) {
          this.confirmLoading = true
          createStaff(values).then(res => {
            return getStaffList().then(res => {
              this.list = res.data
            }).catch(err => {
              this.$message.error(err.msg)
            })
          }).then(res => {
            this.$emit('update', false)
            this.$message.info('创建成功')
          }).catch(err => {
            this.$message.error(err.message)
          }).finally(() => {
            this.confirmLoading = false
          })
        }
      })
    }
  }
}
</script>
