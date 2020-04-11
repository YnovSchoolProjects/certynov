import Vue from 'vue'
import App from './App.vue'
import store from './plugins/store/store';
import router from './plugins/router';
import { contracts } from './plugins/contracts';
import './plugins/vue-material';

Vue.config.productionTip = false;
Vue.prototype.$contracts = contracts;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
