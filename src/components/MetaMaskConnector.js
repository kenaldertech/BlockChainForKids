import React, { useState } from 'react';
import styled from 'styled-components';
import Web3Client from 'web3'; // Cambiado el nombre de la importación

// Estilos para el contenedor principal
const Container = styled.div`
  background-color: #220B91; /* Nuevo color de fondo para la franja */
  padding: 5px; /* Añadir un espacio alrededor del contenido */
  
`;

// Estilos para el botón
const ConnectButton = styled.button`
  background-color: #9c27b0; /* Morado */
  border: none;
  color: white;
  padding: 15px 30px; /* Aumentar el tamaño del botón */
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 18px; /* Aumentar el tamaño del texto */
  cursor: pointer;
  border-radius: 10px;
  margin: 20px 0; /* Añadir margen arriba y abajo */
`;

// Estilos para el contenedor de la cuenta
const AccountContainer = styled.div`
  margin-top: 20px;
`;

const MetaMaskConnector = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState('');

  // Función para conectar con MetaMask
  const connectToMetaMask = async () => {
    if (window.ethereum) {
      try {
        // Solicitar al usuario que autorice el acceso a su cuenta de MetaMask
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3Client(window.ethereum); // Cambiado el nombre de la clase
        // Obtener la dirección de la cuenta del usuario
        const accounts = await web3.eth.getAccounts();
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setIsConnected(true);
        }
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      }
    } else {
      console.error('MetaMask is not installed');
    }
  };

  return (
    <Container>
      {!isConnected ? (
        <ConnectButton onClick={connectToMetaMask}>Connect to MetaMask</ConnectButton>
      ) : (
        <AccountContainer>
          <p>Connected with MetaMask</p>
          <p>Account: {account}</p>
        </AccountContainer>
      )}
    </Container>
  );
};

export default MetaMaskConnector;
   