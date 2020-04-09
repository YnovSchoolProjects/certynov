import Web3 from 'web3';

const ethState = {
  accounts: [],
  initialized: false,
};

const mutations = {
  INIT: (state, { accounts }) => {
    state.accounts = accounts;
    state.initialized = true;
  },
};

const actions = {
  async initStore(store) {
    if (!store.state.initialized) {
      if (!window.ethereum) {
        throw Error('unable to find ethereum module');
      }

      const ethereum = window.ethereum;
      const web3 = new Web3(ethereum);

      try {
        await ethereum.enable();
        const accounts= await web3.eth.getAccounts();
        store.commit('INIT', { accounts });

        // var myContract = new web3.eth.Contract(abi,contractAddress);
        // myContract.methods.RegisterInstructor('11','Ali')
        //   .send(option,function(error,result){
        //     if (! error)
        //       console.log(result);
        //     else
        //       console.log(error);
        //   });
      } catch (error) {
        throw Error('Access denied error.')
      }
    }
  },
};

const getters = {
  getAccounts: state => state.accounts,
  isInitialized: state => state.initialized,
};

export default {
  namespaced: true,
  state: ethState,
  mutations,
  actions,
  getters,
};
