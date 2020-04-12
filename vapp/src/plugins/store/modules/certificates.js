import { CertificateApi } from "../../../services/Certificate";

const ethState = {
  ownedRoles: [],
  ownedCertificates: [],
  issuers: [],
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
  },
  ISSUERS: (state, { issuers }) => {
    state.issuers = issuers;
  },
  TRUST_STATUS: (state, { issuer }) => {
    state.issuers.forEach((item) => {
      if (item.address === issuer.address) {
        item.trusted = issuer.trusted;
      }
    })
  }
};

const actions = {
  async initStore({ state, commit, rootGetters }) {
    if (!await rootGetters['eth/isInitialized']) {
      console.error('eth store is not initialized.');
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
  async fetchIssuers({ state, commit, rootGetters }, force = false) {
    if (!await rootGetters['eth/isInitialized'] || !state.initialized) {
      console.error('eth store is not initialized.');
      return;
    }

    if (state.issuers.length === 0 || force) {
      const issuers = await state.certificateApi.fetchIssuers();
      commit('ISSUERS', { issuers });
    }
  },
  async setTrustStatus({ state, commit, rootGetters }, issuer) {
    if (!await rootGetters['eth/isInitialized'] || !state.initialized) {
      console.error('eth store is not initialized.');
      return;
    }

    await state.certificateApi.setTrustStatus(issuer);
    commit('TRUST_STATUS', { issuer });
  }
};

const getters = {
  getOwnedRoles: state => state.ownedRoles,
  getOwnedCertificates: state => state.ownedCertificates,
  getIssuers: state => state.issuers,
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
