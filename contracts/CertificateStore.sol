pragma solidity >=0.4.21 <0.6.0;

import "./Ownable.sol";

contract CertificateStore is Ownable {
    event CertificateStored(Certificate _certificate, uint _id);

    struct Certificate {
        address issuer;
        address owner;
        string title;
        string certificateHash;
        uint256 issuedAt;
    }

    Certificate[] public certificates;

    function storeCertificate(address _owner, string _title, string _certHash) public {
        Certificate memory certificate = Certificate(msg.sender, _owner, _title, _certHash, now);
        uint id = certificates.push(certificate);

        emit CertificateStored(certificate, id);
    }
}
