import { Result } from "./Result";
import { format, fromUnixTime } from 'date-fns';

export class Certificate {
  constructor([ issuer, owner, title, hash, issuedAt ]) {
    this.issuer = issuer;
    this.owner = owner;
    this.title = title;
    this.hash = hash;
    this.issuedAt = format(fromUnixTime(issuedAt), 'dd/MM/yyyy');
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

  async issueCertificate({ hash, owner, title }) {
    const issueResult = await this.certificateContract.methods.issueCertificate(owner, title, hash).send();

    if (issueResult.status && issueResult.events['CertificateStored'] !== null) {
      return new Result(true);
    }

    return new Result(false);
  }

  async authenticateCertificate({ hash, owner }) {
    const authResult = await this.certificateContract.methods.authenticateHash(hash, owner).call();
    console.log(authResult);

    if (authResult.authenticated) {
      const certificate = await this.fetchCertificate(authResult.authenticatedCertificateId);
      return new Result(true, certificate);
    }

    return new Result(false);
  }

  async fetchOwnedCertificates() {
    const certificates = [];

    const ownedCertificatesIds = await this.certificateContract.methods.getOwnedCertificatesId().call() || [];
    for (let certId of ownedCertificatesIds) {
      let certificate = await this.fetchCertificate(certId);
      certificates.push(certificate);
    }

    return certificates;
  }

  async fetchCertificate(certId) {
    const certificate = await this.certificateContract.methods.getCertificateById(certId).call();
    return new Certificate(certificate);
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
    try {
      if (issuer.trusted) {
        await this.certificateContract.methods.addIssuer(issuer.address, issuer.organization).send();
      } else {
        await this.certificateContract.methods.revokeIssuer(issuer.address, issuer.organization).send();
      }
      return new Result(true);
    } catch (e) {
      return new Result(false, e);
    }
  }
}