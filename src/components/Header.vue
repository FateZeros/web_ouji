<template>
    <div class="header">
	    <div class="logo">aa</div>
    <div class="user-info">
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          <img class="user-img" :src="userImg"/>
          {{username}}
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="loginout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import demoUser from '@/assets/demoUser.jpg'

export default {
  data () {
    let userInfo = localStorage.getItem('OUJI_INFO') || '{}'
    console.log(userInfo)
    if (userInfo) {
      userInfo = JSON.parse(userInfo)
    }
    let { username = '' } = userInfo
    return {
      username,
      userImg: demoUser
    }
  },
  methods: {
    handleCommand (command) {
      if (command === 'loginout') {
        localStorage.setItem('OUJI_INFO', '')
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style scoped>
.header {
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  line-height: 70px;
  background: #324157;
}

.logo {
  float: left;
}

.user-info {
  float: right;
  padding-right: 50px;
  font-size: 16px;
  color: #fff;
}

.user-info .el-dropdown-link{
  position: relative;
  display: inline-block;
  padding-left: 50px;
  color: #fff;
  cursor: pointer;
  vertical-align: middle;
}

.user-info .user-img{
  position: absolute;
  left:0;
  width:40px;
  height:40px;
  border-radius: 50%;
  top: 50%;
  margin-top: -20px;
}

.el-dropdown-menu__item{
  text-align: center;
}
</style>