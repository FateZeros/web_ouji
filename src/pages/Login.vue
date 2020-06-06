<template>
	<div class="container">
        <div class="content">
            <div class="top">
                <div class="header">
                    欧记商务管理系统
                </div>
                <div class="desc">
                    Enterprise Information Manage System
                </div>
            </div>
            <el-form
                class="demo-dynamic login-form"
                :model="loginForm"
                :rules="loginRule"
                ref="loginForm"
                label-width="80px"
                label-postion="right"
            >
                <el-form-item prop="userName" label="用户名">
                    <el-input v-model.trim="loginForm.userName" placeholder="请输入用户名">
                    </el-input>
                </el-form-item>
                <el-form-item prop="password" label="密码">
                    <el-input type="password" v-model.trim="loginForm.password" placeholder="请输入密码">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="doLogin('loginForm')" class="loginBtn">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
	</div>
</template>

<script>
import { Login } from '@/api'

export default {
  data() {
    return {
      loginForm: {
        userName: '',
        password: ''
      },
      loginRule: {
        userName: [{ required: true, message: '请输入用户名' }],
        password: [{ required: true, message: '请输入密码' }]
      }
    }
  },
  methods: {
    doLogin(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(
            'submit',
            this.loginForm.userName,
            this.loginForm.password
          )
          const LoginData = {
            username: this.loginForm.userName,
            password: this.loginForm.password
          }
          Login(LoginData)
            .then(() => {
              // 登录成功 用户信息
              const loginUser = {
                username: this.loginForm.userName
              }
              localStorage.setItem('OUJI_INFO', JSON.stringify(loginUser))
              this.$router.push({ path: '/nnc1' })
            })
            .catch(({ code, msg }) => {
              this.$message({
                message: msg,
                type: 'error',
                duration: 2000
              })
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style>
.container {
  width: 100%;
  height: 100%;
  background: url('/static/loginBg.svg') no-repeat center;
  background-size: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
}

.content {
  padding: 200px 0 24px;
}

.top {
  text-align: center;
}

.header {
  height: 44px;
  line-height: 44px;
  font-size: 33px;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 600;
}

.desc {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.45);
  margin-top: 12px;
  margin-bottom: 40px;
}

.login-form {
  width: 368px;
  margin: 0 auto;
}

.loginBtn {
  width: 100%;
  margin-top: 20px;
}
</style>
