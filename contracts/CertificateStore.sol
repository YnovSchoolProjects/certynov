pragma solidity >=0.5.0 <0.6.0;
pragma experimental ABIEncoderV2;

import "./CertificateStoreCore.sol";

contract CertificateStore is CertificateStoreCore {
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

        for (uint i = 0; i < certificates.length && current < _ownedCertificates.length; i++) {
            if (certificates[i].owner == msg.sender) {
                _ownedCertificates[current] = i;
                current++;
            }
        }

        return _ownedCertificates;
    }
}
