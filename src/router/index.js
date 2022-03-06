import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/pages/Login.vue'
import Home from '@/pages/Home.vue'
import NNC1 from '@/pages/Nnc1.vue'
import ND2A from '@/pages/Nd2a.vue'
// 改股改董
import GGGD from '@/pages/Gggd.vue'
// 年审(中文)
import YearCheckCN from '@/pages/YearCheck.cn.vue'
// 年审(英文)
import YearCheckEN from '@/pages/YearCheck.en.vue'
// 数据上传
import UploadData from '@/pages/upload-data'
import WechatBill from '@/pages/wechat-bill'

import Page404 from '@/components/404.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '/nnc1',
          component: NNC1
        },
        {
          path: '/nd2a',
          component: ND2A
        },
        {
          path: '/gggd',
          component: GGGD
        },
        {
          path: '/ns-cn',
          component: YearCheckCN
        },
        {
          path: '/ns-en',
          component: YearCheckEN
        },
        {
          path: '/upload-data',
          component: UploadData
        },
        {
          path: '/wechat-bill',
          component: WechatBill
        }
      ]
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/404',
      component: Page404
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
