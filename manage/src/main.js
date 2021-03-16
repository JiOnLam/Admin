import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import VueAxios from 'vue-axios';
import SlideVerify from 'vue-monoplasty-slide-verify';
import VueCookies from 'vue-cookies';



axios.defaults.baseURL = 'http://127.0.0.1:9000';
Vue.use(SlideVerify);
Vue.use(VueAxios,axios);
Vue.use(ElementUI);
Vue.use(VueCookies);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
