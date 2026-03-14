// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AuditBadge is ERC721, Ownable {

    uint256 private _tokenIdCounter;

    struct BadgeData {
        string contractName;
        uint256 securityScore;
        string ipfsCid;
        uint256 timestamp;
    }

    mapping(uint256 => BadgeData) public badges;

    event BadgeMinted(
        address indexed recipient,
        uint256 indexed tokenId,
        string contractName,
        uint256 securityScore,
        string ipfsCid
    );

    constructor() ERC721("Audit Badge", "ABADGE") Ownable() {}

    // Soulbound: block all transfers
    function transferFrom(address, address, uint256) public pure override {
        revert("Soulbound: non-transferable");
    }

    function safeTransferFrom(address, address, uint256, bytes memory) public pure override {
        revert("Soulbound: non-transferable");
    }

    function mint(
        address recipient,
        string memory _contractName,
        uint256 _securityScore,
        string memory _ipfsCid
    ) public onlyOwner returns (uint256) {

        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;

        _safeMint(recipient, tokenId);

        badges[tokenId] = BadgeData({
            contractName: _contractName,
            securityScore: _securityScore,
            ipfsCid: _ipfsCid,
            timestamp: block.timestamp
        });

        emit BadgeMinted(
            recipient,
            tokenId,
            _contractName,
            _securityScore,
            _ipfsCid
        );

        return tokenId;
    }

    function getBadge(uint256 tokenId)
        public
        view
        returns (
            string memory contractName,
            uint256 securityScore,
            string memory ipfsCid,
            uint256 timestamp
        )
    {
        BadgeData memory badge = badges[tokenId];
        return (
            badge.contractName,
            badge.securityScore,
            badge.ipfsCid,
            badge.timestamp
        );
    }

    function totalMinted() public view returns (uint256) {
        return _tokenIdCounter;
    }
}