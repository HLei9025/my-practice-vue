import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import AppScroll from './components/app-scroll'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

Vue.component(AppScroll.name, AppScroll)
Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  // return value.charAt(0).toUpperCase() + value.slice(1)
  return value.substring(0, 1).toUpperCase() + value.substring(1)
})

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: (h) => h(App)
  // created(){
  //   console.log('store',store) // 有效。实例中可以直接用store访问
  // }
}).$mount('#app')
