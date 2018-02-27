<template>
  <div class="sidebar">
    <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
      <template v-for="item in routeItems">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
            <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
            </el-menu-item>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>{{ item.title }}
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
  export default {
    created () {
      let userInfo = localStorage.getItem('OUJI_INFO')
      if (userInfo) {
        userInfo = JSON.parse(userInfo)
        this.userRole = userInfo.userRole
      }
      this.routeRight(this.routeItems)
    },
    data () {
      const routeItems = [{
        icon: 'el-icon-date',
        index: '/home',
        title: '预约记录',
        roleRight: ['role_1', 'role_2', 'role_3']
      }, {
        icon: 'el-icon-document',
        index: 'mine',
        title: '我的预约',
        roleRight: ['role_1', 'role_2'],
        subs: [{
          index: '/my-appoint',
          title: '预约管理',
          roleRight: ['role_1', 'role_2']
        }]
      }, {
        icon: 'el-icon-setting',
        index: '/setting',
        title: '系统设置',
        roleRight: ['role_1'],
        subs: [{
          index: '/set-rooms',
          title: '会议室管理',
          roleRight: ['role_1']
        }, {
          index: '/set-user',
          title: '用户管理',
          roleRight: ['role_1']
        }]
      }]

      return {
        routeItems,
        userRole: 'role_3'
      }
    },
    methods: {
      // 只适用于总共二级的菜单结构
      routeRight (routes) {
        this.routeItems = routes.filter(item => {
          if (item.roleRight.includes(this.userRole)) {
            const hasSubs = !!item.subs
            if (hasSubs) {
              item.subs = item.subs.filter(subItem => {
                if (subItem.roleRight.includes(this.userRole)) {
                  return subItem
                }
              })
            }
            return item
          }
        })
      }
    },
    computed: {
      onRoutes () {
        return this.$route.path
      }
    }
  }
</script>

<style scoped>
  .sidebar{
    position: absolute;
    width: 250px;
    left: 0;
    top: 70px;
    bottom:0;
    background: #2E363F;
  }

  .sidebar > ul {
    height:100%;
  }
</style>
