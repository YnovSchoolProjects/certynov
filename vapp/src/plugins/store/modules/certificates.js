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

      const ownedCertificates = await CertificateContract.methods.getOwnedCertificates().call();
      commit('INIT', { certificates: ownedCertificates });
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
