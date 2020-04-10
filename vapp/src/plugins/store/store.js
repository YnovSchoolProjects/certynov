import Vue from 'vue';
import Vuex from 'vuex';
import ethInteropModule from './modules/ethinterop';
import certificatesModule from './modules/certificates';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    eth: ethInteropModule,
    certs: certificatesModule,
  },
});