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

    /**
    * @dev Issue a new certificate from input data (only trusted issuer)
    */
    function issueCertificate(address _owner, string memory _title, string memory _certHash) public onlyTrustedIssuer {
        Certificate memory certificate = Certificate(msg.sender, _owner, _title, _certHash, now);

        uint id = certificates.push(certificate);
        certificateHashToCertificate[_certHash] = id;

        certificateCount[_owner]++;
        issuedCertificateCount[msg.sender]++;

        emit CertificateStored(id, _title);
    }

    /**
    * @dev Returns true and the certificate if the given certificate hash and the pretended owner match
    */
    function authenticateHash(string memory _certHash, address _pretendedOwner) public view returns (bool authenticated, Certificate memory authenticatedCertificate) {
        uint certId = certificateHashToCertificate[_certHash];
        Certificate memory emptyCert = Certificate(msg.sender, msg.sender, '', '', now);

        if(certId == 0) {
            return (false, emptyCert);
        }

        Certificate memory foundCertificate = certificates[certId];

        if(foundCertificate.owner != _pretendedOwner) {
            return (false, emptyCert);
        }

        return (true, foundCertificate);
    }

    /**
    * @dev Returns certificates owned by the caller
    */
    function getOwnedCertificates() public view returns (Certificate[] memory ownedCertificates) {
        Certificate[] memory _ownedCertificates = new Certificate[](certificateCount[msg.sender]);
        uint current = 0;
        uint certificateLength = certificates.length;
        uint ownedLimit = _ownedCertificates.length - 1;

        for (uint i = 0; i <= certificateLength && current != ownedLimit; i++) {
            if (certificates[i].owner == msg.sender) {
                _ownedCertificates[current] = certificates[i];
                current++;
            }
        }

        return _ownedCertificates;
    }
}
