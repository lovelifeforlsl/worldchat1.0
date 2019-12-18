import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import webim from "./webim/webim"
// import antdesign from "./ant-config"

// Vue.use(antdesign)
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

Vue.use(Antd)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  webim,
  render: h => h(App)
}).$mount('#app')
