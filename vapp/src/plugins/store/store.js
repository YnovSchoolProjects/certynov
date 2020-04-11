import Vue from 'vue';
import Vuex from 'vuex';
import ethInteropModule from './modules/ethinterop';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    eth: ethInteropModule,
  },
});