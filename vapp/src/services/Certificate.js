export class Certificate {
  constructor([ issuer, owner, title, hash, issuedAt ]) {
    this.issuer = issuer;
    this.owner = owner;
    this.title = title;
    this.hash = hash;
    this.issuedAt = issuedAt;
  }
}

export class Issuer {
  constructor([address, organization, trusted]) {
    this.address = address;
    this.organization = organization;
    this.trusted = trusted;
  }
}

export class CertificateApi {
  constructor(certificateContract) {
    this.certificateContract = certificateContract;
  }

  async fetchOwnedCertificates() {
    const certificates = [];

    const ownedCertificatesIds = await this.certificateContract.methods.getOwnedCertificatesId().call() || [];
    for (let certId of ownedCertificatesIds) {
      let certificate = await this.certificateContract.methods.getCertificateById(certId).call();
      certificates.push(new Certificate(certificate));
    }

    return certificates;
  }

  async fetchOwnedRoles() {
    const roles = [];

    const isOwner = await this.certificateContract.methods.isOwner().call();
    const isIssuer = await this.certificateContract.methods.isTrustedIssuer().call();

    if (isOwner) {
      roles.push('owner');
    }

    if (isIssuer) {
      roles.push('issuer');
    }

    return roles;
  }

  async fetchIssuers() {
    const issuers = [];
    const fetched = await this.certificateContract.methods.getIssuers().call() || [];

    for (let issuer of fetched) {
      issuers.push(new Issuer(issuer));
    }

    return issuers;
  }

  async setTrustStatus(issuer) {
    if (issuer.trusted) {
      const result = await this.certificateContract.methods.addIssuer(issuer.address, issuer.organization).send();
      console.log('trusted', result);
    } else {
      const result = await this.certificateContract.methods.revokeIssuer(issuer.address, issuer.organization).send();
      console.log('untrusted', result);
    }
  }
}