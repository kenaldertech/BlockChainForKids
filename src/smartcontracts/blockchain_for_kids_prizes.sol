// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract BlockchainForKidsPrizes is ERC721 {
    // Mapa para asociar cada token ID con su URL de imagen
    mapping(uint256 => string) private tokenImageUrls;

    // Contador para llevar un seguimiento del número de tokens minteados
    uint256 private mintedTokensCount;

    constructor() ERC721("Blockchain For Kids Prizes", "BFK") {}

    // Función para obtener la URL de imagen de un NFT por su token ID
    function getTokenImageUrl(uint256 tokenId) external view returns (string memory) {
        return tokenImageUrls[tokenId];
    }

    // Función para obtener el número total de tokens minteados
    function getTotalMintedTokensCount() external view returns (uint256) {
        return mintedTokensCount;
    }

    // Función para mintear los NFTs específicos
    function mintAllNFTs(address to) external {
        require(mintedTokensCount == 0, "Tokens already minted");

        _mint(to, 1); // OpenZeppelin.png
        tokenImageUrls[1] = "https://edurevi.com/es/blockchainforkids/nfts/OpenZeppelin.png";
        mintedTokensCount++;

        _mint(to, 2); // chainlink.png
        tokenImageUrls[2] = "https://edurevi.com/es/blockchainforkids/nfts/chainlink.png";
        mintedTokensCount++;

        _mint(to, 3); // chainlink2.png
        tokenImageUrls[3] = "https://edurevi.com/es/blockchainforkids/nfts/chainlink2.png";
        mintedTokensCount++;

        _mint(to, 4); // scroll1.png
        tokenImageUrls[4] = "https://edurevi.com/es/blockchainforkids/nfts/scroll1.png";
        mintedTokensCount++;

        _mint(to, 5); // scroll2.png
        tokenImageUrls[5] = "https://edurevi.com/es/blockchainforkids/nfts/scroll2.png";
        mintedTokensCount++;
    }
}
