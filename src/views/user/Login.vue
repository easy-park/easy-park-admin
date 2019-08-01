<template>
  <div class="login">
    <a-form
      id="formLogin"
      class="user-layout-login"
      ref="formLogin"
      :form="form"
      @submit="handleSubmit"
    >
      <a-form-item>
        <a-input
          size="large"
          type="text"
          placeholder="账户名/邮箱/手机号"
          v-decorator="[
            'username',
            {
              rules: [
                { required: true, message: '请输入账户名/邮箱/手机号' }
              ]
            }
          ]"
        >
          <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-input
          size="large"
          type="password"
          autocomplete="false"
          placeholder="密码"
          v-decorator="[
            'password',
            {
              rules: [
                { required: true, message: '请输入密码' }
              ]
            }
          ]"
        >
          <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        </a-input>
      </a-form-item>

      <a-form-item style="margin-top:24px">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          :loading="state.isConfirmLoading"
          :disabled="state.isConfirmLoading"
        >确定</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { EMAIL as EMAIL_REGEXP, MOBILE_PHONE as MOBOILE_PHONE_REGEXP } from '@/util/regexp'
import { mapActions } from 'vuex'
import { ACTIONS } from '@/store'
import { VERIFICATION_FAILED, FROZEN_ACCOUNT } from '@/api/manage/login'
import { UNKNOWN_ERROR } from '@/api/status'

export default {
  data () {
    return {
      form: this.$form.createForm(this),
      state: {
        time: 60,
        isConfirmLoading: false,
        smsSendBtn: false
      }
    }
  },
  methods: {
    ...mapActions({
      login: ACTIONS.LOGIN
    }),
    handleSubmit (e) {
      e.preventDefault()
      const {
        form: { validateFields },
        state,
        login
      } = this

      validateFields((err, values) => {
        if (!err) {
          state.isConfirmLoading = true
          const loginParams = this.collectLoginInfo(values)
          login(loginParams).then((res) => {
            this.$message.success('登录成功')
            this.$router.push('/home')
          }).catch(err => {
            switch (err.status) {
              case VERIFICATION_FAILED.STATUS:
                this.$message.error(VERIFICATION_FAILED.MESSAGE)
                break
              case FROZEN_ACCOUNT.STATUS:
                this.$message.error(FROZEN_ACCOUNT.MESSAGE)
                break
              default:
                this.$message.error(UNKNOWN_ERROR.MESSAGE)
            }
          }).finally(() => {
            state.isConfirmLoading = false
          })
        }
      })
    },
    collectLoginInfo (values) {
      const ret = Object.assign({
        username: undefined,
        email: undefined,
        phoneNumber: undefined,
        password: undefined
      }, values)
      if (new RegExp(EMAIL_REGEXP).test(ret.username)) {
        ret.email = ret.username
        delete ret.username
      } else if (new RegExp(MOBOILE_PHONE_REGEXP).test(ret.username)) {
        ret.phoneNumber = ret.username
        delete ret.username
      }
      return ret
    }
  }
}
</script>

<style lang="less" scoped>
.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>
