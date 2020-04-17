const CertificateStore = artifacts.require("CertificateStore");
const StringUtils = artifacts.require("StringUtils");

module.exports = async (deployer) => {
  await deployer.deploy(StringUtils);
  await deployer.link(StringUtils, CertificateStore);
  await deployer.deploy(CertificateStore);
};
