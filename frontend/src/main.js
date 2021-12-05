import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import { BootstrapVue } from 'bootstrap-vue'
import Notifications from 'vue-notification'
import JSONView from 'vue-json-component'

// CSS
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './app.css'

Vue.use(BootstrapVue)
Vue.use(Notifications)
Vue.use(JSONView)

Vue.config.productionTip = false
axios.defaults.baseURL = process.env.VUE_APP_BASEURL

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
