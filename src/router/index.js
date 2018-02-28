import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/pages/Login.vue'
import Home from '@/pages/Home.vue'
import NNC1 from '@/pages/Nnc1.vue'
import ND2A from '@/pages/Nd2a.vue'

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
            children: 
            [
                {
                    path: '/nnc1',
                    component: NNC1
                },
                {
                    path: '/nd2a',
                    component: ND2A
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