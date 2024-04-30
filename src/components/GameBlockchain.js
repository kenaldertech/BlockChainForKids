import React, { useState } from 'react';
import styled from 'styled-components';

// Importa las imágenes necesarias
import fondoJuego from '../assets/fondo_juego.png';
import busImagen from '../assets/bus.png';
import logoScrollImagen from '../assets/logos_scroll.gif';

// Estilos para el contenedor del juego
const GameContainer = styled.div`
  position: relative;
  width: 1024px;
  height: 768px;
  background-image: url(${fondoJuego});
  background-size: cover;
`;

// Estilos para el bus
const Bus = styled.img`
  position: absolute;
  width: 100px;
  height: 100px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: transform 2s ease; /* Transición suave para la salida del bus */
`;

// Estilos para los logos de scroll
const LogoScroll = styled.img`
  position: absolute;
  width: 50px;
  height: 50px;
  /* Ajusta las posiciones de los logos según tu diseño */
`;

const GameBlockchain = () => {
  const [busVisible, setBusVisible] = useState(true);

  // Función para manejar la salida del bus
  const handleBusSalida = () => {
    setBusVisible(false);
  };

  // Función para calcular la suma aleatoria
  const calcularSumaAleatoria = () => {
    // Genera tres números aleatorios entre 1 y 10
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const num3 = Math.floor(Math.random() * 10) + 1;
    // Calcula la suma de los tres números
    const suma = num1 + num2 + num3;
    // Retorna un array con los números y la suma
    return [num1, num2, num3, suma];
  };

  // Llama a la función para calcular la suma aleatoria
  const [numerosAleatorios, sumaAleatoria] = calcularSumaAleatoria();

  return (
    <GameContainer>
      {/* Renderiza el bus si aún no ha salido */}
      {busVisible && <Bus src={busImagen} alt="Bus" />}
      {/* Renderiza los logos de scroll */}
      {/* Ajusta las posiciones de los logos según tu diseño */}
      <LogoScroll src={logoScrollImagen} style={{ top: '100px', left: '100px' }} />
      <LogoScroll src={logoScrollImagen} style={{ top: '200px', left: '200px' }} />
      {/* Agrega más logos según sea necesario */}
      {/* Muestra la suma aleatoria para que el niño la valide */}
      {sumaAleatoria}
      {/* Muestra un mensaje de éxito si la suma es correcta */}
      {/* Si la suma es correcta, activa la animación de salida del bus */}
      {/* Si la suma es incorrecta, muestra un mensaje para intentarlo de nuevo */}
    </GameContainer>
  );
};

export default GameBlockchain;
