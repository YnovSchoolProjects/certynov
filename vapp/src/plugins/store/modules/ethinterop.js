import Web3 from 'web3';
import certificatesModule from "./certificates";

const ethState = {
  account: null,
  gasPrice: '',
  contracts: {},
  initialized: false,
};

const mutations = {
  INIT: (state, { account, gasPrice }) => {
    state.account = account;
    state.gasPrice = gasPrice;
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
        const gasPrice = await web3.eth.getGasPrice();

        const options = { from: account };
        store.commit('INIT', { account, gasPrice });

        for (let [contractName, contract] of Object.entries(contracts)) {
          const contractInstance = new web3.eth.Contract(contract.abi, contract.address, options);
          store.commit('ADD_CONTRACT', { name: contractName, instance: contractInstance });
        }

        await store.dispatch('certs/initStore');
      } catch (error) {
        console.log(error)
      }
    }
  },
};

const getters = {
  hasAccount: state => state.account !== null,
  getAccount: state => state.account,
  getGasPrice: state => state.gasPrice,
  getContracts: state => state.contracts,
  isInitialized: state => state.initialized,
};

export default {
  namespaced: true,
  state: ethState,
  mutations,
  actions,
  getters,
  modules:{
    certs: certificatesModule,
  },
};
