import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

// Definir la dirección del contrato y el ABI del contrato inteligente
const contractAddress = "0xc7C9b74C736F9183601781E298D25f74B56e82fD"; // Dirección del contrato en la red de Scroll Sepolia
const contractABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getTokenImageUrl",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTotalMintedTokensCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "mintAllNFTs",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

const tokenImages = [
  "https://edurevi.com/es/blockchainforkids/nfts/OpenZeppelin.png",
  "https://edurevi.com/es/blockchainforkids/nfts/chainlink.png",
  "https://edurevi.com/es/blockchainforkids/nfts/chainlink2.png",
  "https://edurevi.com/es/blockchainforkids/nfts/scroll1.png",
  "https://edurevi.com/es/blockchainforkids/nfts/scroll2.png"
];

const tokenInfo = {
  1: { name: "OpenZeppelin", supply: 1000000 },
  2: { name: "Chainlink", supply: 1000000 },
  3: { name: "Chainlink2", supply: 1000000 },
  4: { name: "Scroll1", supply: 1000000 },
  5: { name: "Scroll2", supply: 1000000 }
};







const Game2 = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('');
  const [tokenCount, setTokenCount] = useState(0);
  const [currentTokenIndex, setCurrentTokenIndex] = useState(0);

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        try {
          const web3Instance = new Web3(window.ethereum);
          await window.ethereum.enable();
          setWeb3(web3Instance);

          const accounts = await web3Instance.eth.getAccounts();
          setAccount(accounts[0]);

          const contractInstance = new web3Instance.eth.Contract(
            contractABI,
            contractAddress,
          );
          setContract(contractInstance);

          const totalTokens = await contractInstance.methods.getTotalMintedTokensCount().call();
          setTokenCount(totalTokens);
        } catch (error) {
          console.error(error);
        }
      }
    };

    initWeb3();
  }, []);

  const mintAllNFTs = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      if (!accounts.length) {
        console.error("No se ha encontrado ninguna cuenta de Ethereum conectada.");
        return;
      }
  
      await contract.methods.mintAllNFTs(accounts[0]).send({ from: accounts[0] });
      const totalTokens = await contract.methods.getTotalMintedTokensCount().call();
      setTokenCount(totalTokens);
    } catch (error) {
      console.error("Error al mintear NFTs:", error);
    }
  };
  

  const handlePrevious = () => {
    setCurrentTokenIndex(prevIndex => (prevIndex === 0 ? tokenImages.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentTokenIndex(prevIndex => (prevIndex === tokenImages.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="GameContainer" style={Game2.styles.gradientBackground}>
      <h1 className="Title" style={Game2.styles.title}>Blockchain NFTs Prizes For Kids!</h1>
      <div className="Content">
        <h2 className="InfoTitle" style={Game2.styles.infoTitle}>Token Info:</h2>
        <p className="InfoText" style={Game2.styles.infoText}>Symbol: BFK</p>
        <p className="InfoText" style={Game2.styles.infoText}>Name: Blockchain For Kids Prizes</p>
        <p className="InfoText" style={Game2.styles.infoText}>Available Supply: 999893</p>
        <div className="ImageContainer" style={Game2.styles.imageContainer}>
          <img src={tokenImages[currentTokenIndex]} alt={tokenInfo[currentTokenIndex + 1].name} className="TokenImage" style={Game2.styles.tokenImage} />
          <div className="ButtonContainer" style={Game2.styles.buttonContainer}>
            <button onClick={handlePrevious} className="NavigationButton" style={Game2.styles.navigationButton}>Previous</button>
            <button onClick={handleNext} className="NavigationButton" style={Game2.styles.navigationButton}>Next</button>
          </div>
        </div>
        
        
       {/* 
       <button onClick={mintAllNFTs} className="MintButton" style={Game2.styles.mintButton}>Mint</button>
  */}
  <a href="https://sepolia.scrollscan.com/tx/0x7c52aceb1f168166c7bb3473db92c49b90a607f483d17961ec908259c1f46821" target="_blank" rel="noopener noreferrer">
  <button className="MintButton" style={Game2.styles.mintButton}>Check the Smart Contract Verified on Scroll</button>
  </a>
      </div>
    </div>
  );
};

export default Game2;

// Estilos CSS
Game2.styles = {
  gradientBackground: {
    background: 'linear-gradient(135deg, #9B30FF, #FF69B4)',
    padding: '20px',
    borderRadius: '10px',
  },
  title: {
    color: '#FFFFFF',
    fontFamily: 'Arial, sans-serif',
    fontWeight: 'bold',
    fontSize: '40px',
    textAlign: 'center',
  },
  infoTitle: {
    color: '#FFFFFF',
    fontFamily: 'Arial, sans-serif',
    fontWeight: 'bold',
    fontSize: '20px',
  },
  infoText: {
    color: '#FFFFFF',
    fontFamily: 'Arial black, sans-serif',
    fontSize: '24px',
    margin: '3px',
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
  },
  tokenImage: {
    width: '350px',
    height: '350px',
    border: '3px solid #FFFFFF',
    boxShadow: '0px 0px 10px 0px rgba(255,255,255,0.75)',
    marginBottom: '10px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  navigationButton: {
    margin: '0 10px',
    backgroundColor: '#FFFFFF',
    borderRadius: '5px',
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  mintButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: '5px',
    padding: '10px 50px',
    margin: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',

  },
};
