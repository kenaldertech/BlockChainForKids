import React, { useState } from 'react';
import styled from 'styled-components';

// Importa las imágenes necesarias
import fondoJuego from '../assets/fondo_juego.png';
import busImagen from '../assets/bus.gif';
import logoScrollImagen from '../assets/logos_scroll.gif';

// Estilos para el contenedor principal
const GameContainer = styled.div`
background: linear-gradient(90deg, #7700DD, #0077DD); 
margin-top: 20px; /* Márgen superior de 20px */
margin-bottom: 20px; /* Márgen inferior de 20px */
  overflow: hidden;
  position: relative;
  width: 700px;
  height: 700px;
  background-image: url(${fondoJuego});
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto; /* Centra el contenedor en la pantalla */
`;

// Estilos para el botón de juego
const PlayButton = styled.button`
  font-size: 48px;
  padding: 20px 40px;
  background-color: #8a2be2; /* Color morado */
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

// Estilos para el botón de enviar
const SendButton = styled.button`
  font-size: 32px;
  padding: 20px 40px;
  background-color: #00ff00; /* Color verde fuerte */
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Agrega un brillo al texto */
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.5); /* Agrega un brillo al botón */
`;

// Estilos para el texto de recogida de RollUps
const LogsCollectedText = styled.div`
  position: absolute;
  font-family: arial black;
  top: 20px;
  left: 20px;
  color: #fff;
  font-size: 2rem;
  background-color: #ff1493; /* Fondo rosado */
  padding: 10px 20px;
  border-radius: 10px;
`;

// Estilo para el componente del título
const Title = styled.h1`
  font-family: arial black;
  font-size: 3rem;
  color: #ffffff; /* Color del texto blanco */
  drop-shadow: 10px
  background-color: #ff1493; /* Fondo rosado */
  padding: 10px 20px;
  border-radius: 10px;
`;



const Game1 = () => {
  const [playStarted, setPlayStarted] = useState(false);
  const [logoScrolls, setLogoScrolls] = useState([]);
  const [busArrived, setBusArrived] = useState(false);
  const [logsCollected, setLogsCollected] = useState(0);
  const [sendButtonEnabled, setSendButtonEnabled] = useState(false);

  // Función para comenzar el juego
  const startGame = () => {
    setPlayStarted(true);
    // Inicializa los logos de scroll
    const initialLogs = [];
    for (let i = 0; i < 6; i++) {
      initialLogs.push({ id: i, collected: false });
    }
    setLogoScrolls(initialLogs);
  };

  // Función para manejar el arrastre del logo de scroll
  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('logoId', id.toString());
  };

  // Función para manejar el soltar del logo de scroll en el bus
  const handleDrop = (e) => {
    e.preventDefault();
    const logoId = parseInt(e.dataTransfer.getData('logoId'));
    const updatedLogs = logoScrolls.map((logo) =>
      logo.id === logoId ? { ...logo, collected: true } : logo
    );
    setLogoScrolls(updatedLogs);
    const collectedCount = updatedLogs.filter((logo) => logo.collected).length;
    setLogsCollected(collectedCount);
    // Si se han recogido todos los logos, habilita el botón de enviar
    if (collectedCount === 6) {
      setSendButtonEnabled(true);
    }
  };

  // Función para manejar el enviar
  const handleSend = () => {
    setBusArrived(true);
  };

  return (
    <GameContainer>
      {/* Botón de inicio */}
      {!playStarted && <PlayButton onClick={startGame}>PLAY</PlayButton>}
      {/* Cuadrícula de logos de scroll */}
      {playStarted &&
        logoScrolls.map((logo) => (
          <img
            key={logo.id}
            src={logoScrollImagen}
            alt="Logo Scroll"
            draggable={!busArrived && !logo.collected}
            onDragStart={(e) => handleDragStart(e, logo.id)}
            style={{
              position: 'absolute',
              top: '100px',
              left: `${logo.id * 115 + 5}px`,
              width: '100px',
              height: '100px',
              opacity: logo.collected ? 0 : 1,
            }}
          />
        ))}
      {/* Bus */}
      {playStarted && (
        <img
          src={busImagen}
          alt="Bus"
          style={{
            position: 'absolute',
            top: 'calc(50% + 115px)',
            left: busArrived ? 'calc(50% + 350px)' : '250px',
            transition: 'left 2s ease',
            width: '200px',
            height: '200px',
          }}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        />
      )}
      {/* Texto de recogida de RollUps */}
      {playStarted && <LogsCollectedText>RollUps collected: {logsCollected}/6</LogsCollectedText>}
      {/* Botón de enviar */}
      {playStarted && sendButtonEnabled && (
        <SendButton onClick={handleSend}>SEND BLOCK</SendButton>
      )}
      {/* Mensaje de felicitaciones */}
      {busArrived && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, 50%)', textAlign: 'center' }}>
          <Title>Congratulations!!!</Title>
          
        </div>
      )}
    </GameContainer>
  );
};

export default Game1;
