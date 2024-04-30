import React, { useState } from 'react';
import Web3 from 'web3';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from './config'; // Importa la dirección del contrato y su ABI desde un archivo de configuración


import styled from 'styled-components';

const Button = styled.button`
  padding: 10px 20px;
  margin: 10px;
  border: none;
  border-radius: 5px;
  background-color: purple;
  color: white;
  font-size: 16px;
  cursor: pointer;
`;




const Nft = () => {
  const [web3, setWeb3] = useState(null);

  // Función para conectarse con Metamask
  const connectMetamask = async () => {
    if (window.ethereum) {
      try {
        // Solicita acceso a la cuenta de Metamask
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
      } catch (error) {
        console.error('Error al conectar con Metamask:', error);
      }
    } else {
      console.error('Metamask no está instalado en este navegador.');
    }
  };

  // Función para mintear un NFT
  const mintNft = async () => {
    if (web3) {
      const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
      try {
        // Llama a la función del contrato para mintear el NFT
        await contract.methods.mintAllNFTs(web3.eth.defaultAccount).send({ from: web3.eth.defaultAccount });
        console.log('NFT minteado exitosamente.');
      } catch (error) {
        console.error('Error al mintear el NFT:', error);
      }
    } else {
      console.error('No hay una instancia de Web3 disponible.');
    }
  };

  // Función para obtener información del NFT minteado
  const getNftInfo = async () => {
    if (web3) {
      const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
      try {
        const totalMinted = await contract.methods.getTotalMintedTokensCount().call();
        console.log('Total de NFTs minteados:', totalMinted);
        // Aquí puedes agregar más llamadas al contrato para obtener información adicional del NFT minteado
      } catch (error) {
        console.error('Error al obtener la información del NFT minteado:', error);
      }
    } else {
      console.error('No hay una instancia de Web3 disponible.');
    }
  };

  return (
    <div>
      <Button onClick={connectMetamask}>Connect Metamask</Button>
      <Button onClick={mintNft}>Mint NFT</Button>
      <Button onClick={getNftInfo}>Info of the Minted NFT</Button>
    </div>
  );
};

export default Nft;
