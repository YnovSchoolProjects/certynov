pragma solidity >=0.5.0 <0.6.0;
pragma experimental ABIEncoderV2;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract CertificateStore is Ownable {
    event CertificateStored(uint _id, string _title);

    struct Certificate {
        address issuer;
        address owner;
        string title;
        string certificateHash;
        uint256 issuedAt;
        bool exist;
    }

    // All the issued certificates
    Certificate[] public certificates;
    // A way to fetch certificates through its hash
    mapping(string => uint) internal certificateHashToCertificate;
    // Trusted issuer is a mapping on order to disable the right to issue certificate to an entity
    mapping(address => bool) internal trustedIssuer;
    // Number of owned certificates and issued certificates
    mapping(address => uint) internal certificateCount;
    mapping(address => uint) internal issuedCertificateCount;

    constructor() public {
        _forgeCertificate(owner(), owner(), 'ORIGINAL_CERTIFICATE', 'ORIGINAL_CERTIFICATE');
    }

    /**
    * @dev Add a new trusted issuer
    */
    function addIssuer(address _issuer) public onlyOwner {
        trustedIssuer[_issuer] = true;
    }

    /**
    * @dev Revoke an existing issuer
    */
    function revokeIssuer(address _issuer) public onlyOwner {
        trustedIssuer[_issuer] = false;
    }

    /**
    * @dev Returns true if the caller is a trusted issuer
    */
    function isTrustedIssuer() public view returns (bool isTrusted) {
        return trustedIssuer[msg.sender];
    }

    /**
    * @dev Throws if called by any account other than a trusted issuer.
    */
    modifier onlyTrustedIssuer() {
        require(isTrustedIssuer(), 'Issuer is not trusted.');
        _;
    }

    function _forgeCertificate(address _issuer, address _owner, string memory _title, string memory _certHash) internal returns (uint certificateId) {
        Certificate memory certificate = Certificate(_issuer, _owner, _title, _certHash, now, true);
        uint id = certificates.push(certificate) - 1;
        certificateHashToCertificate[_certHash] = id;

        certificateCount[_owner]++;
        issuedCertificateCount[msg.sender]++;

        return id;
    }

    /**
    * @dev Issue a new certificate from input data (only trusted issuer)
    */
    function issueCertificate(address _owner, string memory _title, string memory _certHash) public onlyTrustedIssuer {
        uint certId = _forgeCertificate(msg.sender, _owner, _title, _certHash);
        emit CertificateStored(certId, _title);
    }

    /**
    * @dev Returns true and the certificate id if the given certificate hash and the pretended owner match
    */
    function authenticateHash(string memory _certHash, address _pretendedOwner) public view returns (bool authenticated, uint authenticatedCertificateId) {
        uint certId = certificateHashToCertificate[_certHash];

        if(certificates[certId].exist == true && certificates[certId].owner == _pretendedOwner) {
            return (true, certId);
        }
        return (false, 0);
    }

    /**
    * @dev Return certificate matching th given id;
    */
    function getCertificateById(uint _certId) public view returns(Certificate memory allCertificates) {
        return certificates[_certId];
    }

    /**
    * @dev Returns certificates owned by the caller
    */
    function getOwnedCertificatesId() public view returns (uint[] memory ownedCertificates) {
        uint[] memory _ownedCertificates = new uint[](certificateCount[msg.sender]);
        uint current = 0;

        for (uint i = 0; i <= certificates.length && current != _ownedCertificates.length - 1; i++) {
            if (certificates[i].owner == msg.sender) {
                _ownedCertificates[current] = i;
                current++;
            }
        }

        return _ownedCertificates;
    }
}
