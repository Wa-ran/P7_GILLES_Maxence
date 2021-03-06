import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/lib/mdbvue.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Avatar from "@/components/Avatar.vue"
Vue.component('Avatar', Avatar)

Vue.config.productionTip = false
Vue.config.errorHandler = function () {
  return
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
