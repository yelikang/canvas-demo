import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/table'
        },
        {
            path: '/table',
            component: () => import('@/views/table/index.vue')
        },
        {
            path: '/select',
            component: () => import('@/views/select/index.vue')
        }
    ]
})
