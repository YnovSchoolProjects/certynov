import CertificateStore from './contracts/CertificateStore.json'

const options = {
  web3: {
    block: false,
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:9545'
    }
  },
  contracts: [CertificateStore],
  events: {
    SimpleStorage: ['CertificateStored']
  },
  polls: {
    accounts: 1500
  }
};

export default options
