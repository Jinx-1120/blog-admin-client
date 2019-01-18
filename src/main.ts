import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/scss/index.scss'

Vue.use(ElementUi)
Vue.config.productionTip = false

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
export default app
