<template>
<div>
  <van-nav-bar title="用户登陆" left-text="返回" left-arrow @click-left="goBack" />

  <div class="login-panel">
    <van-field v-model="username" label="用户名" clearable placeholder="请输入用户名" required :error-message="usernameErrorMsg" />
    <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" required :error-message="passwordErrorMsg" />
  </div>

  <div class="login-button">
    <van-button type="primary" size="large" @click="loginAction" :loading="openLoading">登陆</van-button>
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
      openLoading: false, //是否开启用户的loading
      usernameErrorMsg: '', //用户名出现错误
      passwordErrorMsg: '' //密码出现错误
    }
  },
  created() {
    // 判断登陆状态
    if(localStorage.userInfo) {
      Toast.success('您已经登陆')
      this.$router.push('/')
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    // 用户登陆
    loginAction() {
      this.checkForm() && this.axiosLoginUser()
    },
    // axios提交用户注册
    axiosLoginUser() {
      this.openLoading = true
      axios({
          url: url.login,
          method: 'post',
          data: {
            userName: this.username,
            password: this.password
          }
        })
        .then(res => {
          if (res.data.code == 200 && res.data.message) {
            new Promise((resolve, reject) => {
                localStorage.userInfo = {
                  userName: this.username
                }
                setTimeout(() => {
                  resolve()
                }, 500)
              })
              .then(() => {
                Toast.success('登陆成功')
                this.$router.push('/')
              })
              .catch(err => {
                Toast.fail('登陆状态保存失败')
              })
          } else {
            Toast.fail('登陆失败')
            this.openLoading = false
          }
        })
        .catch(err => {
          Toast.fail('登陆失败')
          this.openLoading = false
        })
    },
    // 客户端验证
    checkForm() {
      let isOk = true
      if (this.username.length < 5) {
        this.usernameErrorMsg = '用户名不能小于5位'
        isOk = false
      } else {
        this.usernameErrorMsg = ''
      }
      if (this.password.length < 6) {
        this.passwordErrorMsg = '密码不能少于6位'
        isOk = false
      } else {
        this.passwordErrorMsg = ''
      }
      return isOk
    }
  }
}
</script>

<style scoped>
.login-panel {
  width: 96%;
  border-radius: 5px;
  margin: 20px auto;
  padding-bottom: 50px;
}

.login-button {
  padding-top: 10px;
}
</style>
