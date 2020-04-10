import Certificate from "../../../services/Certificate";

const ethState = {
  ownedCertificates: [],
  initialized: false,
};

const mutations = {
  INIT: (state, { certificates }) => {
    state.ownedCertificates = certificates;
    state.initialized = true;
  },
};

const actions = {
  async initStore({ state, commit, rootGetters }) {
    if (!await rootGetters['eth/isInitialized']) {
      console.log('eth store is not initialized.');
      return;
    }

    if (!state.initialized) {
      const { CertificateStore: CertificateContract } = await rootGetters['eth/getContracts'];
      const certificates = [];

      const ownedCertificatesIds = await CertificateContract.methods.getOwnedCertificatesId().call();
      for (let certId of ownedCertificatesIds) {
        let certificate = await CertificateContract.methods.getCertificateById(certId).call();
        certificates.push(new Certificate(certificate));
      }

      commit('INIT', { certificates });
    }
  },
};

const getters = {
  getOwnedCertificates: state => state.ownedCertificates,
  isInitialized: state => state.initialized,
};

export default {
  namespaced: true,
  state: ethState,
  mutations,
  actions,
  getters,
};
