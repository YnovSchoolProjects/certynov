import Vue from 'vue'
import App from './App.vue'
import store from './plugins/store/store';
import {contracts} from './plugins/contracts';

Vue.config.productionTip = false;
Vue.prototype.$contracts = contracts;

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
