import Vue from 'vue'
import App from './App.vue'
import antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import router from './router'

Vue.use(antd)
Vue.config.devtools = true
new Vue({
    router,
    render: (h) => h(App)
}).$mount('#app')
