<template>
  <div class="sidebar">
    <el-menu
      :default-active="onRoutes"
      class="el-menu-vertical-demo"
      theme="dark"
      unique-opened
      router
    >
      <template v-for="item in routeItems">
        <template v-if="item.subs">
          <el-submenu
            :index="item.index"
            :key="item.index"
          >
            <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
            <el-menu-item
              v-for="(subItem,i) in item.subs"
              :key="i"
              :index="subItem.index"
            >{{ subItem.title }}
            </el-menu-item>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item
            :index="item.index"
            :key="item.index"
          >
            <i :class="item.icon"></i>{{ item.title }}
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    const routeItems = [
      {
        icon: 'el-icon-document',
        index: 'word',
        title: 'Word文档',
        subs: [
          {
            index: '/nnc1',
            title: 'NNC1文档'
          },
          {
            index: '/gggd',
            title: '改股改董'
          },
          {
            index: '/nd2a',
            title: 'ND2A文档'
          }
          // {
          //   index: '/ns-cn',
          //   title: '年审(海铭)'
          // }
          // {
          //   index: '/ns-en',
          //   title: '年审(欧记)'
          // }
          // {
          //   index: '/nr1',
          //   title: 'NR1文档'
          // },
          // {
          //   index: '/nar1',
          //   title: 'NAR1文档'
          // },
          // {
          //   index: '/tax',
          //   title: '致税務局'
          // },
          // {
          //   index: '/nd4',
          //   title: 'ND4文档'
          // }
        ]
      },
      // {
      //   icon: 'el-icon-setting',
      //   index: '/setting',
      //   title: '系统设置'
      // }
      {
        icon: 'el-icon-menu',
        index: '/upload-data',
        title: '数据上传'
      },
      {
        icon: 'el-icon-menu',
        index: '/wechat-bill',
        title: '微信账单'
      }
    ]

    return {
      routeItems
    }
  },
  computed: {
    onRoutes() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.sidebar {
  position: absolute;
  width: 250px;
  left: 0;
  top: 70px;
  bottom: 0;
  background: #2e363f;
}

.sidebar > ul {
  height: 100%;
}
</style>
