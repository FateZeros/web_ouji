import Vue from 'vue'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App'
import router from './router'

Vue.use(VueResource)
Vue.config.productionTip = false

Vue.use(ElementUI)

// 注册全局钩子
router.beforeEach((to, from, next) => {
  const userInfo = localStorage.getItem('OUJI_INFO')
  if (!userInfo) {
    // 无登录信息
    if (to.path !== '/login') {
        next('/login')
    } else {
        next()
    }
    // next()
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

// /* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   render: h => h(App)
// })
