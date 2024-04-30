import logo from './logo.svg';
import './App.css';
import VortexTitle from './components/VortexComponent'; // Importa el componente creado
import Carousel from './components/Carousel';
import GameBlockchain from './components/GameBlockchain';
import Game1 from './components/game1';
import MetaMaskConnector from './components/MetaMaskConnector';
import Nft from './components/Nft';

function App() {
  return (

    <div className="App">
      <MetaMaskConnector/>
      <VortexTitle />
      <Carousel/>
      <div>
      <Game1/>
      </div>
      <Nft/>
  </div>


  );
}

export default App;
