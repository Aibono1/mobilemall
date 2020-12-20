<template>
<div>
  <van-nav-bar title="用户注册" left-text="返回" left-arrow @click-left="goBack" />

  <div class="register-panel">
    <van-field v-model="username" label="用户名" clearable placeholder="请输入用户名" required :error-message="usernameErrorMsg"/>
    <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" required :error-message="passwordErrorMsg"/>
  </div>

  <div class="register-button">
    <van-button type="primary" size="large" @click="registerAction" :loading="openLoading">立刻注册</van-button>
  </div>

</div>
</template>

<script>
import axios from 'axios'
import {
  Toast
} from 'vant'
import url from '@/serviceAPI.config.js'
export default {
  data() {
    return {
      username: '',
      password: '',
      openLoading: false,     //是否开启用户的loading
      usernameErrorMsg: '',   //用户名出现错误
      passwordErrorMsg: ''    //密码出现错误
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    // 注册用户
    registerAction() {
      this.checkForm() && this.axiosRegisterUser()
    },
    // axios提交用户注册
    axiosRegisterUser() {
      this.openLoading = true
      axios({
          url: url.registerUser,
          method: 'post',
          data: {
            userName: this.username,
            password: this.password
          }
        })
        .then(res => {
          if (res.data.code == 200) {
            Toast.success('注册成功')
            this.$router.push('/')
          } else {
            Toast.fail('注册失败')
            this.openLoading = false
          }
        })
        .catch(err => {
          Toast.fail('注册失败')
          this.openLoading = false
        })
    },
    // 客户端验证
    checkForm() {
      let isOk = true
      if(this.username.length < 5) {
        this.usernameErrorMsg = '用户名不能小于5位'
        isOk = false
      }else {
        this.usernameErrorMsg = ''
      }
      if(this.password.length < 6) {
        this.passwordErrorMsg = '密码不能少于6位'
        isOk = false
      }else {
        this.passwordErrorMsg = ''
      }
      return isOk
    }
  }
}
</script>

<style scoped>
.register-panel {
  width: 96%;
  border-radius: 5px;
  margin: 20px auto;
  padding-bottom: 50px;
}

.register-button {
  padding-top: 10px;
}
</style>
