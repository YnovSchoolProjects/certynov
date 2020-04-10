const CertificateStore = artifacts.require('CertificateStore');

contract("Certificate Store", async accounts => {
  it('owner should be accounts[0]', async () => {
    const instance = await CertificateStore.deployed();

    assert.equal(await instance.isOwner.call({ from: accounts[0] }), true);
  });

  it('should be able to add a new issuer', async () => {
    const instance = await CertificateStore.deployed();

    await instance.addIssuer.call(accounts[0], { from: accounts[0] });
    assert.equal(await  instance.isTrustedIssuer.call({ from: accounts[0] }), true);
  });
});