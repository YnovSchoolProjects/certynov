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

    modifier isTrustedIssuer() {
        require(trustedIssuer[msg.sender] == true, 'Issuer is not trusted.');
        _;
    }

    function issueCertificate(address _owner, string calldata _title, string calldata _certHash) external isTrustedIssuer {
        Certificate memory certificate = Certificate(msg.sender, _owner, _title, _certHash, now);

        uint id = certificates.push(certificate);
        certificateHashToCertificate[_certHash] = id;

        certificateCount[_owner]++;
        issuedCertificateCount[msg.sender]++;

        emit CertificateStored(id, _title);
    }

    function addIssuer(address _issuer) external onlyOwner {
        trustedIssuer[_issuer] = true;
    }

    function authenticateHash(string calldata _certHash, address _pretendedOwner) external view returns (bool, Certificate memory) {
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

    function getOwnedCertificates() external view returns (Certificate[] memory) {
        Certificate[] memory ownedCertificates = new Certificate[](certificateCount[msg.sender]);
        uint current = 0;
        uint certificateLength = certificates.length;
        uint ownedLimit = ownedCertificates.length - 1;

        for (uint i = 0; i <= certificateLength && current != ownedLimit; i++) {
            if (certificates[i].owner == msg.sender) {
                ownedCertificates[current] = certificates[i];
                current++;
            }
        }

        return ownedCertificates;
    }
}
