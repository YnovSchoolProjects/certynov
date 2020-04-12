pragma solidity >=0.5.0 <0.6.0;
pragma experimental ABIEncoderV2;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract CertificateStoreCore is Ownable {
    event CertificateStored(uint _id, string _title);
    event TrustedIssuer(address _issuer, string _organization);
    event UntrustedIssuer(address _issuer, string _organization);

    struct Issuer {
        address issuer;
        string organization;
        bool trusted;
        bool exist;
    }

    struct Certificate {
        Issuer issuer;
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
    // issuers is a mapping on order to disable the right to issue certificate to an entity
    mapping(address => Issuer) internal issuers;
    // Number of owned certificates and issued certificates
    mapping(address => uint) internal certificateCount;
    mapping(address => uint) internal issuedCertificateCount;

    constructor() public {
        Issuer memory issuer = _forgeIssuer(owner(), 'CertifY');
        _forgeCertificate(issuer, owner(), 'ORIGINAL_CERTIFICATE', 'ORIGINAL_CERTIFICATE');
    }

    /**
    * @dev Add a new trusted issuer
    */
    function addIssuer(address _issuer, string memory _organization) public onlyOwner {
        if(issuers[_issuer].exist) {
            issuers[_issuer].trusted = true;
        } else {
            Issuer memory _newIssuer = _forgeIssuer(_issuer, _organization);
            _newIssuer.trusted = true;

            issuers[_issuer] = _newIssuer;
        }

        emit TrustedIssuer(_issuer, _organization);
    }

    /**
    * @dev Revoke an existing issuer
    */
    function revokeIssuer(address _issuer, string memory _organization) public onlyOwner {
        if(issuers[_issuer].exist) {
            issuers[_issuer].trusted = false;
        } else {
            Issuer memory _newIssuer = _forgeIssuer(_issuer, _organization);

            issuers[_issuer] = _newIssuer;
        }

        emit UntrustedIssuer(_issuer, _organization);
    }

    /**
    * @dev Returns true if the caller is a trusted issuer
    */
    function isTrustedIssuer() public view returns (bool isTrusted) {
        return issuers[msg.sender].trusted;
    }

    /**
    * @dev Throws if called by any account other than a trusted issuer.
    */
    modifier onlyTrustedIssuer() {
        require(isTrustedIssuer(), 'Issuer is not trusted.');
        _;
    }

    /**
    * Create an untrusted issuer.
    */
    function _forgeIssuer(address _issuer, string memory _organization) pure internal returns (Issuer memory newIssuer) {
        return Issuer(_issuer, _organization, false, true);
    }

    /**
    * Create a certificate, do some magic and return its id.
    */
    function _forgeCertificate(Issuer memory _issuer, address _owner, string memory _title, string memory _certHash) internal returns (uint certificateId) {
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
        uint certId = _forgeCertificate(issuers[msg.sender], _owner, _title, _certHash);
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
}
