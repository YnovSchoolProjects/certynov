import { CertificateApi } from "../../../services/Certificate";

const ethState = {
  ownedRoles: [],
  ownedCertificates: [],
  certificateApi: null,
  initialized: false,
};

const mutations = {
  INIT: (state, { certificates, roles }) => {
    state.ownedRoles = roles;
    state.ownedCertificates = certificates;
    state.initialized = true;
  },
  API: (state, { certificateApi }) => {
    state.certificateApi = certificateApi;
  }
};

const actions = {
  async initStore({ state, commit, rootGetters }) {
    if (!await rootGetters['eth/isInitialized']) {
      console.log('eth store is not initialized.');
      return;
    }

    if (!state.initialized) {
      const { CertificateStore: CertificateContract } = await rootGetters['eth/getContracts'];
      const certificateApi = new CertificateApi(CertificateContract);
      commit('API', { certificateApi });

      const roles = await certificateApi.fetchOwnedRoles();
      const certificates = await certificateApi.fetchOwnedCertificates();

      commit('INIT', { certificates, roles });
    }
  },
};

const getters = {
  getOwnedRoles: state => state.ownedRoles,
  getOwnedCertificates: state => state.ownedCertificates,
  isInitialized: state => state.initialized,
  isOwner: state => state.ownedRoles.includes('owner'),
  isIssuer: state => state.ownedRoles.includes('issuer'),
};

export default {
  namespaced: true,
  state: ethState,
  mutations,
  actions,
  getters,
};
