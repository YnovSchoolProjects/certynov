const CertificateStore = artifacts.require("CertificateStore");

module.exports = function(deployer) {
  deployer.deploy(CertificateStore);
};
