import CertificateStoreContract from '../contracts/CertificateStore';
import CertificateStoreHelpersContract from '../contracts/CertificateStoreHelpers';

export const contracts = {
  CertificateStore: {
    abi: CertificateStoreContract.abi,
    address: '0x8a5Abdf85e0486F5D9FA0943E2a24E7F8151A0e2'
  },
  CertificateStoreHelpers: {
    abi: CertificateStoreHelpersContract.abi,
    address: '0x6baf21121146E36e9AE093D238b46760Dc027C9A',
  }
};