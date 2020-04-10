const CertificateStore = artifacts.require('CertificateStore');

contract("Certificate Store", async accounts => {
  it('owner should be accounts[0]', async () => {
    const instance = await CertificateStore.deployed();

    assert.equal(await instance.isOwner.call({ from: accounts[0] }), true);
  });

  describe('issuer trust process', async () => {
    it('should not be able to add a new issuer if not owner', async () => {
      const instance = await CertificateStore.deployed();

      try {
        await instance.addIssuer(accounts[0], { from: accounts[1] });
      } catch (e) {
        assert.include(e.message, 'Ownable: caller is not the owner');
      }
    });

    it('should be able to add a new issuer if owner', async () => {
      const instance = await CertificateStore.deployed();

      await instance.addIssuer(accounts[0], { from: accounts[0] });
      assert.equal(await  instance.isTrustedIssuer.call({ from: accounts[0] }), true);
    });
  });

  describe('certificate issuing process', async () => {
    it('should fail if issuer is not trusted', async () => {
      const instance = await CertificateStore.deployed();

      try {
        await instance.issueCertificate(accounts[1], 'test certificate', 'a hashed certificate content', { from: accounts[1] });
      } catch (e) {
        assert.include(e.message, 'Issuer is not trusted');
      }
    });

    it('should succeed if issuer is trusted', async () => {
      const instance = await CertificateStore.deployed();

      const tx = await instance.issueCertificate(accounts[1], 'test certificate', 'a hashed certificate content', { from: accounts[0] });

      assert.equal(tx.logs[0].event, 'CertificateStored');
      assert.equal(tx.logs[0].args._title, 'test certificate');
    });

    it('should be able to get generated certificate on succeed', async () => {
      const instance = await CertificateStore.deployed();

      await instance.issueCertificate(accounts[1], 'test certificate', 'a hashed certificate content', { from: accounts[0] });
      const certs = await instance.getOwnedCertificatesId.call({ from: accounts[1] });
      const ownedCert = await instance.getCertificateById.call(certs[0], { from: accounts[0] });

      assert.equal(ownedCert['title'], 'test certificate');
      assert.equal(ownedCert['certificateHash'], 'a hashed certificate content');
    });
  });

  describe('certificate authentication process', async () => {
    it('should not authenticate an invalid certificate : invalid hash', async () => {
      const instance = await CertificateStore.deployed();

      await instance.issueCertificate(accounts[1], 'test certificate', 'a hashed certificate content', { from: accounts[0] });

      const authResult = await instance.authenticateHash.call('a not valid certificate content', accounts[1], { from: accounts[0] });

      assert.isFalse(authResult.authenticated);
      assert.equal(authResult.authenticatedCertificateId, 0);
    });

    it('should not authenticate an invalid certificate : bad owner', async () => {
      const instance = await CertificateStore.deployed();

      await instance.issueCertificate(accounts[1], 'test certificate', 'a hashed certificate content', { from: accounts[0] });

      const authResult = await instance.authenticateHash.call('a hashed certificate content', accounts[2], { from: accounts[0] });
      assert.isFalse(authResult.authenticated);
      assert.equal(authResult.authenticatedCertificateId, 0);
    });
  });
});