import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './scss/styles.scss'
import './plugins/axios.js'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import VAnimateCss from 'v-animate-css'
import ImgInputer from 'vue-img-inputer'
import 'vue-img-inputer/dist/index.css'
import mixin from './mixin.js'

Vue.component('ImgInputer', ImgInputer)
Vue.use(VueSweetalert2)
Vue.use(VAnimateCss)
Vue.mixin(mixin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
