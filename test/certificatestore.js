const CertificateStore = artifacts.require('CertificateStore');

contract('Certificate Store : Overlay', async accounts => {
  describe('issued certificates fetch process', async () => {
    it('should be able to fetch issued certificate : no certificate', async () => {
      const instance = await CertificateStore.deployed();

      await instance.addIssuer(accounts[8], 'CertifY', { from: accounts[0] });
      const issuedCertificates = await instance.getIssuedCertificates.call({  from: accounts[8] });

      assert.equal(issuedCertificates.length, 0);
    });

    it('should be able to fetch issued certificate : one issued certificate', async () => {
      const instance = await CertificateStore.deployed();

      let issuedCertificates = await instance.getIssuedCertificates.call({ from: accounts[8] });
      assert.equal(issuedCertificates.length, 0);

      await instance.issueCertificate(accounts[1], 'test certificate', 'a hashed certificate content', { from: accounts[8] });

      issuedCertificates = await instance.getIssuedCertificates.call({ from: accounts[8] });
      assert.equal(issuedCertificates.length, 1);
    });
  });

  describe('certificate fetch process', async () => {
    it('should be able to fetch existing certificat by id', async () => {
      const instance = await CertificateStore.deployed();

      // 0 is the genesis certificate
      const certificate = await instance.getCertificateById.call(0);

      assert.equal(certificate['title'], 'ORIGINAL_CERTIFICATE');
      assert.equal(certificate['certificateHash'], 'ORIGINAL_CERTIFICATE');
    });

    it('should be able to fetch owned certificates', async () => {
      const instance = await CertificateStore.deployed();

      const certificates = await instance.getOwnedCertificatesId.call({from: accounts[0]});
      assert.equal(certificates.length, 1);

      const ownedCertificate = await instance.getCertificateById.call(certificates[0]);
      assert.equal(ownedCertificate['title'], 'ORIGINAL_CERTIFICATE');
      assert.equal(ownedCertificate['certificateHash'], 'ORIGINAL_CERTIFICATE');
    });
  });

  describe('issuer fetch process', async () => {
    it('should be able to fetch all issuers', async () => {
      const instance = await CertificateStore.deployed();

      const issuers = await instance.getIssuers.call({from: accounts[0]});
      assert.equal(issuers.length, 1);
    });
  });
});