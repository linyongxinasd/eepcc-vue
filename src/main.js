import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"

import axios from './axios'
/*
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
*/

Vue.prototype.$axios = axios
/*Vue.config.productionTip = false*/


Vue.use(Element)

//require("./mock.js") //引入mock数据，关闭则注释该行

/*Vue.config.productionTip = false*/

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
