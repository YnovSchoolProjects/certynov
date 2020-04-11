export class Certificate {
  constructor([ issuer, owner, title, hash, issuedAt ]) {
    this.issuer = issuer;
    this.owner = owner;
    this.title = title;
    this.hash = hash;
    this.issuedAt = issuedAt;
  }
}

export class CertificateApi {
  constructor(contract) {
    this.contract = contract;
  }

  async fetchOwnedCertificates() {
    const certificates = [];

    const ownedCertificatesIds = await this.contract.methods.getOwnedCertificatesId().call();
    for (let certId of ownedCertificatesIds) {
      let certificate = await this.contract.methods.getCertificateById(certId).call();
      certificates.push(new Certificate(certificate));
    }

    return certificates;
  }

  async fetchOwnedRoles() {
    const roles = [];

    const isOwner = await this.contract.methods.isOwner().call();
    const isIssuer = await this.contract.methods.isTrustedIssuer().call();

    if (isOwner) {
      roles.push('owner');
    }

    if (isIssuer) {
      roles.push('issuer');
    }

    return roles;
  }
}