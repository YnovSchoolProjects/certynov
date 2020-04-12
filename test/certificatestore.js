const CertificateStore = artifacts.require('CertificateStore');

contract('Certificate Store : Overlay', async accounts => {
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