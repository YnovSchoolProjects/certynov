import Web3 from 'web3';

const ethState = {
  accounts: [],
  contracts: {},
  initialized: false,
};

const mutations = {
  INIT: (state, { account }) => {
    state.account = account;
    state.initialized = true;
  },
  ADD_CONTRACT: (state, { name, instance }) => {
    state.contracts[name] = instance;
  },
};

const actions = {
  async initStore(store) {
    if (!store.state.initialized) {
      if (!window.ethereum) {
        throw Error('unable to find ethereum module, install MetaMask or use Brave Browser');
      }

      const ethereum = window.ethereum;
      const web3 = new Web3(ethereum);

      try {
        const contracts = this._vm.$contracts;

        await ethereum.enable();
        const [account] = await web3.eth.getAccounts();

        const options = { from: account };
        store.commit('INIT', { account });

        for (let [contractName, contract] of Object.entries(contracts)) {
          const contractInstance = new web3.eth.Contract(contract.abi, contract.address, options);
          store.commit('ADD_CONTRACT', { name: contractName, instance: contractInstance});
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
};

const getters = {
  getAccount: state => state.account,
  getContracts: state => state.contracts,
  isInitialized: state => state.initialized,
};

export default {
  namespaced: true,
  state: ethState,
  mutations,
  actions,
  getters,
};
